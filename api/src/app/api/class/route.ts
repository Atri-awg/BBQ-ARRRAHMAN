import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, asyncHandler, getPaginationParams, createPaginationMeta, generateCode } from '@/lib/utils';
import { createClassSchema } from '@/lib/validators';
import { HTTP_STATUS } from '@/lib/constants';

// GET /api/kelas - Get all classes
export const GET = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const { skip, take, page, limit } = getPaginationParams(searchParams);
  
  // Filters
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';
  const level = searchParams.get('level') || '';
  const status = searchParams.get('status') || '';
  const pengajarId = searchParams.get('pengajarId') || '';

  // Build where clause
  const where: any = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { code: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (type) where.type = type;
  if (level) where.level = level;
  if (status) where.status = status;
  if (pengajarId) where.pengajarId = pengajarId;

  // Get total count
  const total = await prisma.class.count({ where });

  // Get classes
  const classes = await prisma.class.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: 'desc' },
    include: {
      pengajar: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
          schedules: true,
        },
      },
    },
  });

  return ApiResponse.success({
    classes,
    pagination: createPaginationMeta(total, page, limit),
  });
});

// POST /api/kelas - Create new class
export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();

  // Validate input
  const validation = createClassSchema.safeParse(body);
  if (!validation.success) {
    return ApiResponse.error('Validation error', HTTP_STATUS.BAD_REQUEST, validation.error.issues);
  }

  const data = validation.data;

  // Check if code already exists
  const existingClass = await prisma.class.findUnique({
    where: { code: data.code },
  });

  if (existingClass) {
    return ApiResponse.conflict('Kode kelas sudah digunakan');
  }

  // Verify pengajar exists
  const pengajar = await prisma.user.findUnique({
    where: { id: data.pengajarId },
    include: {
      userRoles: {
        include: { role: true },
      },
    },
  });

  if (!pengajar) {
    return ApiResponse.notFound('Pengajar tidak ditemukan');
  }

  // Verify pengajar has correct role
  const isPengajar = pengajar.userRoles.some(ur => ur.role.name === 'pengajar');
  if (!isPengajar) {
    return ApiResponse.error('User bukan pengajar', HTTP_STATUS.BAD_REQUEST);
  }

  // Create class
  const newClass = await prisma.class.create({
    data: {
      name: data.name,
      code: data.code,
      description: data.description,
      pengajarId: data.pengajarId,
      level: data.level,
      type: data.type,
      capacity: data.capacity,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
    include: {
      pengajar: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return ApiResponse.created(newClass, 'Kelas berhasil dibuat');
});