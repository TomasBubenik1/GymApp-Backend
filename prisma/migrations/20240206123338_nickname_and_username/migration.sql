-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "realname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "currentWeight" DOUBLE PRECISION NOT NULL,
    "goalWeight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "password" TEXT NOT NULL,
    "profilepicture" TEXT NOT NULL DEFAULT 'https://ik.imagekit.io/bubenik/UserProfilePictures/defaultpfp.png',

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
    "description" VARCHAR(500),
    "title" VARCHAR(50) NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    "sess" JSONB NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "UserExerciseData" (
    "userId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserExerciseData_pkey" PRIMARY KEY ("userId","exerciseId")
);

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

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "video" TEXT,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "createdById" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedPost" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "LikedPost_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "LikedWorkoutPlan_userId_key" ON "LikedWorkoutPlan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedWorkoutPlan_workoutPlanId_key" ON "LikedWorkoutPlan"("workoutPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_id_key" ON "WorkoutPlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "session_sid_key" ON "session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE INDEX "Post_userId_idx" ON "Post"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_userId_key" ON "LikedPost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_postId_key" ON "LikedPost"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutPlan_AB_unique" ON "_ExerciseToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutPlan_B_index" ON "_ExerciseToWorkoutPlan"("B");

-- AddForeignKey
ALTER TABLE "LikedWorkoutPlan" ADD CONSTRAINT "LikedWorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedWorkoutPlan" ADD CONSTRAINT "LikedWorkoutPlan_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD CONSTRAINT "UserExerciseData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD CONSTRAINT "UserExerciseData_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseDataHistory" ADD CONSTRAINT "UserExerciseDataHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseDataHistory" ADD CONSTRAINT "UserExerciseDataHistory_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
