/*
  Warnings:

  - You are about to drop the column `createdAt` on the `achievements` table. All the data in the column will be lost.
  - You are about to drop the column `audioRecordingUrl` on the `assessments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "announcements_publishedAt_idx";

-- DropIndex
DROP INDEX "messages_sentAt_idx";

-- DropIndex
DROP INDEX "notifications_createdAt_idx";

-- AlterTable
ALTER TABLE "achievements" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "assessments" DROP COLUMN "audioRecordingUrl";
