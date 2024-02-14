/*
  Warnings:

  - You are about to drop the `UserCalorieIntakeHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCalorieIntakeHistory" DROP CONSTRAINT "UserCalorieIntakeHistory_userId_fkey";

-- DropTable
DROP TABLE "UserCalorieIntakeHistory";

-- CreateTable
CREATE TABLE "CalorieIntakeHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goalCalories" INTEGER NOT NULL,
    "consumedCalories" INTEGER NOT NULL,

    CONSTRAINT "CalorieIntakeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "userCalorieDateIndex" ON "CalorieIntakeHistory"("userId", "date");

-- AddForeignKey
ALTER TABLE "CalorieIntakeHistory" ADD CONSTRAINT "CalorieIntakeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
