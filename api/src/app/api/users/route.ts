import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { ApiResponse, asyncHandler, getPaginationParams, createPaginationMeta } from '@/lib/utils';
import { createUserSchema } from '@/lib/validators';
import { HTTP_STATUS } from '@/lib/constants';

// GET /api/users - Get all users with pagination and filters
export const GET = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const { skip, take, page, limit } = getPaginationParams(searchParams);
  
  // Filters
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role') || '';
  const isActive = searchParams.get('isActive');

  // Build where clause
  const where: any = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (isActive !== null && isActive !== undefined && isActive !== '') {
    where.isActive = isActive === 'true';
  }

  if (role) {
    where.userRoles = {
      some: {
        role: {
          name: role,
        },
      },
    };
  }

  // Get total count
  const total = await prisma.user.count({ where });

  // Get users
  const users = await prisma.user.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: 'desc' },
    include: {
      profile: true,
      userRoles: {
        include: {
          role: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });

  // Remove passwords from response
  const sanitizedUsers = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return ApiResponse.success({
    users: sanitizedUsers,
    pagination: createPaginationMeta(total, page, limit),
  });
});

// POST /api/users - Create new user
export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();

  // Validate input
  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return ApiResponse.error('Validation error', HTTP_STATUS.BAD_REQUEST, validation.error.issues);
  }

  const { email, password, name, roleIds, phoneNumber, address, dateOfBirth, gender } = validation.data;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return ApiResponse.conflict('Email sudah terdaftar');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user with profile and roles
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      profile: {
        create: {
          phoneNumber,
          address,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
          gender,
        },
      },
      userRoles: {
        create: roleIds.map(roleId => ({
          roleId,
        })),
      },
    },
    include: {
      profile: true,
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return ApiResponse.created(userWithoutPassword, 'User berhasil dibuat');
});