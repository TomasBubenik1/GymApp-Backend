/*
  Warnings:

  - Added the required column `previousHistory` to the `UserExerciseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserExerciseHistory" ADD COLUMN     "previousHistory" JSONB NOT NULL;
