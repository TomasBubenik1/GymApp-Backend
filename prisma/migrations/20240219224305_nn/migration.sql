/*
  Warnings:

  - You are about to drop the column `weight` on the `UserGoalWeightHistory` table. All the data in the column will be lost.
  - Added the required column `goalWeight` to the `UserGoalWeightHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserGoalWeightHistory" DROP COLUMN "weight",
ADD COLUMN     "goalWeight" DOUBLE PRECISION NOT NULL;
