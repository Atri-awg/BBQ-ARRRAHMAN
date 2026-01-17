import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/lib/utils';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    roles: string[];
  };
}

export async function authMiddleware(req: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized('Token tidak ditemukan');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      userId: string;
      email: string;
      roles: string[];
    };

    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      return ApiResponse.unauthorized('User tidak valid atau tidak aktif');
    }

    // Attach user to request
    return {
      user: {
        userId: decoded.userId,
        email: decoded.email,
        roles: user.userRoles.map(ur => ur.role.name),
      },
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return ApiResponse.unauthorized('Token tidak valid');
    }
    if (error instanceof jwt.TokenExpiredError) {
      return ApiResponse.unauthorized('Token expired');
    }
    return ApiResponse.unauthorized('Autentikasi gagal');
  }
}

export function requireRoles(roles: string[]) {
  return (userRoles: string[]) => {
    const hasRole = roles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return ApiResponse.forbidden('Anda tidak memiliki akses ke resource ini');
    }
    return null;
  };
}