// Role constants
export const ROLES = {
  ADMIN: 'admin',
  PENGAJAR: 'pengajar',
  MAHASISWA: 'mahasiswa',
} as const;

// Class status
export const CLASS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPLETED: 'completed',
} as const;

// Class types
export const CLASS_TYPES = {
  TAHSIN: 'tahsin',
  TAJWID: 'tajwid',
  TAHFIDZ: 'tahfidz',
} as const;

// Class levels
export const CLASS_LEVELS = {
  PEMULA: 'pemula',
  MENENGAH: 'menengah',
  LANJUT: 'lanjut',
} as const;

// Enrollment status
export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
} as const;

// Attendance status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused',
} as const;

// Schedule status
export const SCHEDULE_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Days of week
export const DAYS_OF_WEEK = {
  SENIN: 'senin',
  SELASA: 'selasa',
  RABU: 'rabu',
  KAMIS: 'kamis',
  JUMAT: 'jumat',
  SABTU: 'sabtu',
  MINGGU: 'minggu',
} as const;

// Material categories
export const MATERIAL_CATEGORIES = {
  TAHSIN: 'tahsin',
  TAJWID: 'tajwid',
  TAHFIDZ: 'tahfidz',
  TEORI: 'teori',
} as const;

// Material content types
export const CONTENT_TYPES = {
  PDF: 'pdf',
  VIDEO: 'video',
  AUDIO: 'audio',
  TEXT: 'text',
} as const;

// Progress status
export const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  MASTERED: 'mastered',
} as const;

// Assessment types
export const ASSESSMENT_TYPES = {
  TAHSIN: 'tahsin',
  TAJWID: 'tajwid',
  TAHFIDZ: 'tahfidz',
  UJIAN: 'ujian',
} as const;

// Assessment categories
export const ASSESSMENT_CATEGORIES = {
  HARIAN: 'harian',
  MINGGUAN: 'mingguan',
  BULANAN: 'bulanan',
  SEMESTER: 'semester',
} as const;

// Grades
export const GRADES = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
} as const;

// Badge types
export const BADGE_TYPES = {
  COMPLETION: 'completion',
  EXCELLENCE: 'excellence',
  CONSISTENCY: 'consistency',
  MILESTONE: 'milestone',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SCHEDULE: 'schedule',
  ASSESSMENT: 'assessment',
  ANNOUNCEMENT: 'announcement',
  REMINDER: 'reminder',
} as const;

// Notification priority
export const NOTIFICATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Target audience
export const TARGET_AUDIENCE = {
  ALL: 'all',
  PENGAJAR: 'pengajar',
  MAHASISWA: 'mahasiswa',
  CLASS_SPECIFIC: 'class_specific',
} as const;

// Gender
export const GENDER = {
  LAKI: 'Laki-laki',
  PEREMPUAN: 'Perempuan',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Export types
export type RoleType = (typeof ROLES)[keyof typeof ROLES];
export type ClassStatusType = (typeof CLASS_STATUS)[keyof typeof CLASS_STATUS];
export type ClassTypeType = (typeof CLASS_TYPES)[keyof typeof CLASS_TYPES];
export type ClassLevelType = (typeof CLASS_LEVELS)[keyof typeof CLASS_LEVELS];
export type EnrollmentStatusType = (typeof ENROLLMENT_STATUS)[keyof typeof ENROLLMENT_STATUS];
export type AttendanceStatusType = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];
export type ProgressStatusType = (typeof PROGRESS_STATUS)[keyof typeof PROGRESS_STATUS];
export type AssessmentTypeType = (typeof ASSESSMENT_TYPES)[keyof typeof ASSESSMENT_TYPES];
export type AssessmentCategoryType = (typeof ASSESSMENT_CATEGORIES)[keyof typeof ASSESSMENT_CATEGORIES];
export type GradeType = (typeof GRADES)[keyof typeof GRADES];
export type NotificationTypeType = (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];
export type NotificationPriorityType = (typeof NOTIFICATION_PRIORITY)[keyof typeof NOTIFICATION_PRIORITY];
export type TargetAudienceType = (typeof TARGET_AUDIENCE)[keyof typeof TARGET_AUDIENCE];
export type GenderType = (typeof GENDER)[keyof typeof GENDER];