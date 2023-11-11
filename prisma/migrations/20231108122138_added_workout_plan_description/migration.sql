/*
  Warnings:

  - You are about to alter the column `title` on the `WorkoutPlan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "description" VARCHAR(500),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);
