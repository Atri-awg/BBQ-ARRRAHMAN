-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "materialId" TEXT,
    "juzNumber" INTEGER,
    "surahName" TEXT,
    "ayahStart" INTEGER,
    "ayahEnd" INTEGER,
    "completionPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "lastStudiedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);
