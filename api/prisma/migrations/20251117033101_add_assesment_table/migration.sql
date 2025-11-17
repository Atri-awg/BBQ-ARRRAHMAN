-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "evaluatorId" TEXT NOT NULL,
    "assessmentType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "grade" TEXT,
    "criteria" JSONB,
    "feedback" TEXT,
    "audioRecordingUrl" TEXT,
    "assessmentDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);
