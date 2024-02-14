/*
  Warnings:

  - You are about to alter the column `description` on the `WorkoutPlan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(255)`.
  - You are about to alter the column `title` on the `WorkoutPlan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(35)`.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "isOfficial" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(35);

-- CreateTable
CREATE TABLE "UserWeightHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWeightHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHeightHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHeightHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCalorieIntakeHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goalCalories" INTEGER NOT NULL,
    "consumedCalories" INTEGER NOT NULL,

    CONSTRAINT "UserCalorieIntakeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserWeightHistory_userId_date_idx" ON "UserWeightHistory"("userId", "date");

-- CreateIndex
CREATE INDEX "UserHeightHistory_userId_date_idx" ON "UserHeightHistory"("userId", "date");

-- CreateIndex
CREATE INDEX "userCalorieDateIndex" ON "UserCalorieIntakeHistory"("userId", "date");

-- AddForeignKey
ALTER TABLE "UserWeightHistory" ADD CONSTRAINT "UserWeightHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHeightHistory" ADD CONSTRAINT "UserHeightHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCalorieIntakeHistory" ADD CONSTRAINT "UserCalorieIntakeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "userDateIndex" RENAME TO "DailyCalorieIntake_userId_date_idx";
