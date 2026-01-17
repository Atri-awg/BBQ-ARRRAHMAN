import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, asyncHandler, getPaginationParams, createPaginationMeta } from '@/lib/utils';
import { createAttendanceSchema } from '@/lib/validators';
import { HTTP_STATUS } from '@/lib/constants';

// GET /api/attendance - Get all attendance records
export const GET = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const { skip, take, page, limit } = getPaginationParams(searchParams);
  
  // Filters
  const enrollmentId = searchParams.get('enrollmentId') || '';
  const scheduleId = searchParams.get('scheduleId') || '';
  const classId = searchParams.get('classId') || '';
  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  // Build where clause
  const where: any = {};
  
  if (enrollmentId) where.enrollmentId = enrollmentId;
  if (scheduleId) where.scheduleId = scheduleId;
  if (status) where.status = status;

  if (classId) {
    where.enrollment = {
      classId: classId,
    };
  }

  if (startDate || endDate) {
    where.attendanceDate = {};
    if (startDate) where.attendanceDate.gte = new Date(startDate);
    if (endDate) where.attendanceDate.lte = new Date(endDate);
  }

  // Get total count
  const total = await prisma.attendance.count({ where });

  // Get attendance records
  const attendances = await prisma.attendance.findMany({
    where,
    skip,
    take,
    orderBy: { attendanceDate: 'desc' },
    include: {
      enrollment: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          class: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
      schedule: {
        select: {
          id: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          location: true,
        },
      },
    },
  });

  return ApiResponse.success({
    attendances,
    pagination: createPaginationMeta(total, page, limit),
  });
});

// POST /api/attendance - Create attendance record
export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  // Validate input
  const validation = createAttendanceSchema.safeParse(body);
  if (!validation.success) {
    return ApiResponse.error('Validation error', HTTP_STATUS.BAD_REQUEST, validation.error.errors);
  }

  const { enrollmentId, scheduleId, attendanceDate, checkInTime, status, notes } = validation.data;

  // Check if enrollment exists
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });

  if (!enrollment) {
    return ApiResponse.notFound('Enrollment tidak ditemukan');
  }

  // Check if schedule exists
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });

  if (!schedule) {
    return ApiResponse.notFound('Schedule tidak ditemukan');
  }

  // Check if attendance already exists for this date
  const existingAttendance = await prisma.attendance.findUnique({
    where: {
      enrollmentId_scheduleId_attendanceDate: {
        enrollmentId,
        scheduleId,
        attendanceDate: new Date(attendanceDate),
      },
    },
  });

  if (existingAttendance) {
    return ApiResponse.conflict('Attendance untuk tanggal ini sudah ada');
  }

  // Create attendance
  const attendance = await prisma.attendance.create({
    data: {
      enrollmentId,
      scheduleId,
      attendanceDate: new Date(attendanceDate),
      checkInTime,
      status,
      notes,
    },
    include: {
      enrollment: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      schedule: true,
    },
  });

  return ApiResponse.created(attendance, 'Attendance berhasil dicatat');
});