-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "currentWeight" DOUBLE PRECISION NOT NULL,
    "goalWeight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedWorkoutPlan" (
    "userId" INTEGER NOT NULL,
    "workoutPlanId" INTEGER NOT NULL,

    CONSTRAINT "LikedWorkoutPlan_pkey" PRIMARY KEY ("userId","workoutPlanId")
);

-- CreateTable
CREATE TABLE "WorkoutPlan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "aliases" TEXT NOT NULL,
    "force" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "mechanic" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "primaryMuscles" TEXT[],
    "secondaryMuscles" TEXT[],
    "instructions" TEXT[],
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date_created" TIMESTAMPTZ NOT NULL,
    "date_updated" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    "sess" JSONB NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "_WorkoutPlanToexercise" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LikedWorkoutPlan_userId_key" ON "LikedWorkoutPlan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedWorkoutPlan_workoutPlanId_key" ON "LikedWorkoutPlan"("workoutPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_id_key" ON "WorkoutPlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_id_key" ON "exercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_name_key" ON "exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "session_sid_key" ON "session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutPlanToexercise_AB_unique" ON "_WorkoutPlanToexercise"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutPlanToexercise_B_index" ON "_WorkoutPlanToexercise"("B");

-- AddForeignKey
ALTER TABLE "LikedWorkoutPlan" ADD CONSTRAINT "LikedWorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedWorkoutPlan" ADD CONSTRAINT "LikedWorkoutPlan_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutPlanToexercise" ADD CONSTRAINT "_WorkoutPlanToexercise_A_fkey" FOREIGN KEY ("A") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutPlanToexercise" ADD CONSTRAINT "_WorkoutPlanToexercise_B_fkey" FOREIGN KEY ("B") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
