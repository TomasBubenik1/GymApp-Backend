/*
  Warnings:

  - You are about to drop the column `isPublic` on the `WorkoutPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "isPublic",
ADD COLUMN     "Visibility" TEXT NOT NULL DEFAULT 'public';
