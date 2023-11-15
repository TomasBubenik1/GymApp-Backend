/*
  Warnings:

  - You are about to drop the `_WorkoutPlanToexercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_WorkoutPlanToexercise" DROP CONSTRAINT "_WorkoutPlanToexercise_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkoutPlanToexercise" DROP CONSTRAINT "_WorkoutPlanToexercise_B_fkey";

-- DropTable
DROP TABLE "_WorkoutPlanToexercise";

-- DropTable
DROP TABLE "exercise";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "force" TEXT,
    "level" TEXT NOT NULL,
    "mechanic" TEXT,
    "equipment" TEXT,
    "primaryMuscles" TEXT[],
    "secondaryMuscles" TEXT[],
    "instructions" TEXT[],
    "category" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExerciseHistory" (
    "userId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserExerciseHistory_pkey" PRIMARY KEY ("userId","exerciseId")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserExerciseHistory_userId_key" ON "UserExerciseHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserExerciseHistory_exerciseId_key" ON "UserExerciseHistory"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutPlan_AB_unique" ON "_ExerciseToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutPlan_B_index" ON "_ExerciseToWorkoutPlan"("B");

-- AddForeignKey
ALTER TABLE "UserExerciseHistory" ADD CONSTRAINT "UserExerciseHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseHistory" ADD CONSTRAINT "UserExerciseHistory_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
