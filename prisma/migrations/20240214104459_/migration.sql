/*
  Warnings:

  - You are about to drop the column `totalCalories` on the `DailyCalorieIntake` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `DailyCalorieIntake` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `goalCalories` to the `DailyCalorieIntake` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DailyCalorieIntake_date_key";

-- AlterTable
ALTER TABLE "DailyCalorieIntake" DROP COLUMN "totalCalories",
ADD COLUMN     "consumedCalories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "goalCalories" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DailyCalorieIntake_userId_date_key" ON "DailyCalorieIntake"("userId", "date");
