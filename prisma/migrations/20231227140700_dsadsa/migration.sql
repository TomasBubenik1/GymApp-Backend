/*
  Warnings:

  - You are about to drop the column `userDataHistory` on the `UserExerciseData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserExerciseData" DROP COLUMN "userDataHistory";

-- CreateTable
CREATE TABLE "UserExerciseDataHistory" (
    "userId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserExerciseDataHistory_pkey" PRIMARY KEY ("userId","exerciseId","createdAt")
);

-- AddForeignKey
ALTER TABLE "UserExerciseDataHistory" ADD CONSTRAINT "UserExerciseDataHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseDataHistory" ADD CONSTRAINT "UserExerciseDataHistory_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
