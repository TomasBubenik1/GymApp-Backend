/*
  Warnings:

  - You are about to drop the `UserExerciseHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserExerciseHistory" DROP CONSTRAINT "UserExerciseHistory_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "UserExerciseHistory" DROP CONSTRAINT "UserExerciseHistory_userId_fkey";

-- DropTable
DROP TABLE "UserExerciseHistory";

-- CreateTable
CREATE TABLE "UserExerciseData" (
    "userId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previousHistory" JSONB NOT NULL,

    CONSTRAINT "UserExerciseData_pkey" PRIMARY KEY ("userId","exerciseId")
);

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD CONSTRAINT "UserExerciseData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD CONSTRAINT "UserExerciseData_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
