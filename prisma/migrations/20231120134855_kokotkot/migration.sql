/*
  Warnings:

  - You are about to drop the column `previousHistory` on the `UserExerciseData` table. All the data in the column will be lost.
  - Added the required column `userDataHistory` to the `UserExerciseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserExerciseData" DROP COLUMN "previousHistory",
ADD COLUMN     "userDataHistory" JSONB NOT NULL;
