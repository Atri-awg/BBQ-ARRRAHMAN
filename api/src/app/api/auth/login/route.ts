import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { ApiResponse, asyncHandler } from '@/lib/utils';
import { loginSchema } from '@/lib/validators';
import { HTTP_STATUS } from '@/lib/constants';

export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();

  // Validate input
  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    return ApiResponse.error('Validation error', HTTP_STATUS.BAD_REQUEST, validation.error.issues);
  }

  const { email, password } = validation.data;

  // Find user with profile and roles
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    return ApiResponse.unauthorized('Email atau password salah');
  }

  // Check if user is active
  if (!user.isActive) {
    return ApiResponse.forbidden('Akun Anda telah dinonaktifkan. Hubungi administrator.');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return ApiResponse.unauthorized('Email atau password salah');
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      roles: user.userRoles.map(ur => ur.role.name),
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );

  // Prepare user data (exclude password)
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    isActive: user.isActive,
    profile: user.profile,
    roles: user.userRoles.map(ur => ({
      id: ur.role.id,
      name: ur.role.name,
      description: ur.role.description,
    })),
    lastLogin: user.lastLogin,
  };

  return ApiResponse.success(
    {
      user: userData,
      token,
    },
    'Login berhasil'
  );
});