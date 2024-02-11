/*
  Warnings:

  - You are about to drop the column `Visibility` on the `WorkoutPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "Visibility",
ADD COLUMN     "thumbnail" TEXT NOT NULL DEFAULT 'https://ik.imagekit.io/bubenik/WorkoutPlanThumbnails/defaultworkoutplanthumbnail',
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'Public';
