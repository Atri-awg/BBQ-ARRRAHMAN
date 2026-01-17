import { z } from 'zod';

// Auth validators
export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const registerSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phoneNumber: z.string().optional(),
  roleId: z.string().uuid(),
});

// User validators
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  roleIds: z.array(z.string().uuid()).min(1),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(['Laki-laki', 'Perempuan']).optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  isActive: z.boolean().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(['Laki-laki', 'Perempuan']).optional(),
  bio: z.string().optional(),
});

// Class validators
export const createClassSchema = z.object({
  name: z.string().min(3, 'Nama kelas minimal 3 karakter'),
  code: z.string().min(3, 'Kode kelas minimal 3 karakter'),
  description: z.string().optional(),
  pengajarId: z.string().uuid('Pengajar ID tidak valid'),
  level: z.enum(['pemula', 'menengah', 'lanjut']),
  type: z.enum(['tahsin', 'tajwid', 'tahfidz']),
  capacity: z.number().int().min(1, 'Kapasitas minimal 1'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
});

export const updateClassSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  level: z.enum(['pemula', 'menengah', 'lanjut']).optional(),
  type: z.enum(['tahsin', 'tajwid', 'tahfidz']).optional(),
  capacity: z.number().int().min(1).optional(),
  status: z.enum(['active', 'inactive', 'completed']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// Enrollment validators
export const createEnrollmentSchema = z.object({
  userId: z.string().uuid(),
  classId: z.string().uuid(),
});

export const updateEnrollmentSchema = z.object({
  status: z.enum(['active', 'completed', 'dropped']),
  finalGrade: z.number().min(0).max(100).optional(),
});

// Schedule validators
export const createScheduleSchema = z.object({
  classId: z.string().uuid(),
  dayOfWeek: z.enum(['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']).optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format waktu harus HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format waktu harus HH:mm'),
  location: z.string().optional(),
  roomNumber: z.string().optional(),
  isRecurring: z.boolean().default(true),
  specificDate: z.string().datetime().optional(),
});

// Attendance validators
export const createAttendanceSchema = z.object({
  enrollmentId: z.string().uuid(),
  scheduleId: z.string().uuid(),
  attendanceDate: z.string().datetime(),
  checkInTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).optional(),
  status: z.enum(['present', 'absent', 'late', 'excused']),
  notes: z.string().optional(),
});

export const checkInSchema = z.object({
  enrollmentId: z.string().uuid(),
  scheduleId: z.string().uuid(),
  qrToken: z.string().optional(),
});

// Material validators
export const createMaterialSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.enum(['tahsin', 'tajwid', 'tahfidz', 'teori']),
  contentType: z.enum(['pdf', 'video', 'audio', 'text']),
  fileUrl: z.string().url().optional(),
  duration: z.number().int().positive().optional(),
  orderIndex: z.number().int().default(0),
});

// Progress validators
export const createProgressSchema = z.object({
  enrollmentId: z.string().uuid(),
  materialId: z.string().uuid().optional(),
  juzNumber: z.number().int().min(1).max(30).optional(),
  surahName: z.string().optional(),
  ayahStart: z.number().int().positive().optional(),
  ayahEnd: z.number().int().positive().optional(),
  completionPercentage: z.number().min(0).max(100).default(0),
  status: z.enum(['not_started', 'in_progress', 'completed', 'mastered']).default('not_started'),
  notes: z.string().optional(),
});

// Assessment validators
export const createAssessmentSchema = z.object({
  enrollmentId: z.string().uuid(),
  evaluatorId: z.string().uuid(),
  assessmentType: z.enum(['tahsin', 'tajwid', 'tahfidz', 'ujian']),
  category: z.enum(['harian', 'mingguan', 'bulanan', 'semester']),
  score: z.number().min(0),
  maxScore: z.number().min(1).default(100),
  feedback: z.string().optional(),
  criteria: z.record(z.any()).optional(),
  audioRecordingUrl: z.string().url().optional(),
  assessmentDate: z.string().datetime(),
});

// Announcement validators
export const createAnnouncementSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  classId: z.string().uuid().optional(),
  targetAudience: z.enum(['all', 'pengajar', 'mahasiswa', 'class_specific']),
  isPinned: z.boolean().default(false),
  expiresAt: z.string().datetime().optional(),
});

// Message validators
export const createMessageSchema = z.object({
  recipientId: z.string().uuid(),
  subject: z.string().optional(),
  content: z.string().min(1),
  replyToId: z.string().uuid().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type CreateAttendanceInput = z.infer<typeof createAttendanceSchema>;
export type CheckInInput = z.infer<typeof checkInSchema>;
export type CreateMaterialInput = z.infer<typeof createMaterialSchema>;
export type CreateProgressInput = z.infer<typeof createProgressSchema>;
export type CreateAssessmentInput = z.infer<typeof createAssessmentSchema>;
export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;