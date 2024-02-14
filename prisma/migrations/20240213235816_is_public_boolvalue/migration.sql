/*
  Warnings:

  - You are about to drop the column `visibility` on the `WorkoutPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "visibility",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;
