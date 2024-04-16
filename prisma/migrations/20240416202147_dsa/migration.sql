/*
  Warnings:

  - You are about to drop the column `Visibility` on the `WorkoutPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "Visibility",
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public';
