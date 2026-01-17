import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, asyncHandler, getPaginationParams, createPaginationMeta, calculateGrade } from '@/lib/utils';
import { createAssessmentSchema } from '@/lib/validators';
import { HTTP_STATUS } from '@/lib/constants';

// GET /api/assessment - Get all assessments
export const GET = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const { skip, take, page, limit } = getPaginationParams(searchParams);
  
  // Filters
  const enrollmentId = searchParams.get('enrollmentId') || '';
  const evaluatorId = searchParams.get('evaluatorId') || '';
  const assessmentType = searchParams.get('assessmentType') || '';
  const category = searchParams.get('category') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  // Build where clause
  const where: any = {};
  
  if (enrollmentId) where.enrollmentId = enrollmentId;
  if (evaluatorId) where.evaluatorId = evaluatorId;
  if (assessmentType) where.assessmentType = assessmentType;
  if (category) where.category = category;

  if (startDate || endDate) {
    where.assessmentDate = {};
    if (startDate) where.assessmentDate.gte = new Date(startDate);
    if (endDate) where.assessmentDate.lte = new Date(endDate);
  }

  // Get total count
  const total = await prisma.assessment.count({ where });

  // Get assessments
  const assessments = await prisma.assessment.findMany({
    where,
    skip,
    take,
    orderBy: { assessmentDate: 'desc' },
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
              type: true,
            },
          },
        },
      },
      evaluator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return ApiResponse.success({
    assessments,
    pagination: createPaginationMeta(total, page, limit),
  });
});

// POST /api/assessment - Create assessment
export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  // Validate input
  const validation = createAssessmentSchema.safeParse(body);
  if (!validation.success) {
    return ApiResponse.error('Validation error', HTTP_STATUS.BAD_REQUEST, validation.error.errors);
  }

  const {
    enrollmentId,
    evaluatorId,
    assessmentType,
    category,
    score,
    maxScore,
    feedback,
    criteria,
    audioRecordingUrl,
    assessmentDate,
  } = validation.data;

  // Check if enrollment exists
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      class: true,
    },
  });

  if (!enrollment) {
    return ApiResponse.notFound('Enrollment tidak ditemukan');
  }

  // Check if evaluator exists and is a pengajar
  const evaluator = await prisma.user.findUnique({
    where: { id: evaluatorId },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!evaluator) {
    return ApiResponse.notFound('Evaluator tidak ditemukan');
  }

  const isPengajar = evaluator.userRoles.some(ur => ur.role.name === 'pengajar');
  if (!isPengajar) {
    return ApiResponse.error('Evaluator harus memiliki role pengajar', HTTP_STATUS.BAD_REQUEST);
  }

  // Calculate grade
  const grade = calculateGrade(score, maxScore);

  // Create assessment
  const assessment = await prisma.assessment.create({
    data: {
      enrollmentId,
      evaluatorId,
      assessmentType,
      category,
      score,
      maxScore,
      grade,
      feedback,
      criteria,
      audioRecordingUrl,
      assessmentDate: new Date(assessmentDate),
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
          class: true,
        },
      },
      evaluator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Update enrollment average grade
  const allAssessments = await prisma.assessment.findMany({
    where: { enrollmentId },
  });

  const averageScore =
    allAssessments.reduce((sum, a) => sum + (a.score / a.maxScore) * 100, 0) / allAssessments.length;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { finalGrade: averageScore },
  });

  // Create notification for student
  await prisma.notification.create({
    data: {
      userId: enrollment.userId,
      title: 'Penilaian Baru',
      message: `Anda mendapat nilai ${grade} untuk ${assessmentType} di kelas ${enrollment.class.name}`,
      type: 'assessment',
      priority: 'medium',
    },
  });

  return ApiResponse.created(assessment, 'Assessment berhasil dibuat');
});