import { NextResponse } from 'next/server';
import { HTTP_STATUS } from './constants';

// API Response Helper
export class ApiResponse {
  static success<T>(data: T, message = 'Success', statusCode = HTTP_STATUS.OK) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: statusCode }
    );
  }

  static error(message: string, statusCode = HTTP_STATUS.BAD_REQUEST, errors?: any) {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      { status: statusCode }
    );
  }

  static created<T>(data: T, message = 'Created successfully') {
    return this.success(data, message, HTTP_STATUS.CREATED);
  }

  static notFound(message = 'Resource not found') {
    return this.error(message, HTTP_STATUS.NOT_FOUND);
  }

  static unauthorized(message = 'Unauthorized access') {
    return this.error(message, HTTP_STATUS.UNAUTHORIZED);
  }

  static forbidden(message = 'Forbidden access') {
    return this.error(message, HTTP_STATUS.FORBIDDEN);
  }

  static conflict(message = 'Resource conflict') {
    return this.error(message, HTTP_STATUS.CONFLICT);
  }

  static serverError(message = 'Internal server error') {
    return this.error(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// UUID v7 Generator (untuk compatibility dengan Prisma schema)
export function generateUuidV7(): string {
  const timestamp = BigInt(Date.now());
  const randomBytes = crypto.getRandomValues(new Uint8Array(10));
  
  // Convert timestamp to bytes
  const timestampBytes = new Uint8Array(6);
  for (let i = 5; i >= 0; i--) {
    timestampBytes[i] = Number(timestamp & BigInt(0xff));
    timestamp >> BigInt(8);
  }
  
  // Combine timestamp and random bytes
  const bytes = new Uint8Array(16);
  bytes.set(timestampBytes, 0);
  bytes.set(randomBytes, 6);
  
  // Set version (7) and variant bits
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  // Convert to UUID string format
  const hex = Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
    
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Pagination Helper
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function getPaginationParams(searchParams: URLSearchParams): {
  skip: number;
  take: number;
  page: number;
  limit: number;
} {
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 10));
  
  return {
    skip: (page - 1) * limit,
    take: limit,
    page,
    limit,
  };
}

export function createPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

// Date Formatting
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

export function formatTime(time: string): string {
  // Ensure HH:mm format
  const parts = time.split(':');
  return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
}

// Grade Calculator
export function calculateGrade(score: number, maxScore: number = 100): string {
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= 85) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'E';
}

// Sanitize user input
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Error handler untuk async route handlers
export function asyncHandler(
  fn: (req: Request, context?: any) => Promise<NextResponse>
) {
  return async (req: Request, context?: any) => {
    try {
      return await fn(req, context);
    } catch (error: any) {
      console.error('API Error:', error);
      
      // Prisma errors
      if (error.code === 'P2002') {
        return ApiResponse.conflict('Resource already exists');
      }
      if (error.code === 'P2025') {
        return ApiResponse.notFound('Resource not found');
      }
      
      // Validation errors
      if (error.name === 'ZodError') {
        return ApiResponse.error('Validation error', HTTP_STATUS.BAD_REQUEST, error.errors);
      }
      
      // Generic error
      return ApiResponse.serverError(
        process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      );
    }
  };
}

// Check if user has role
export function hasRole(userRoles: string[], requiredRoles: string[]): boolean {
  return requiredRoles.some(role => userRoles.includes(role));
}

// Generate random code
export function generateCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}