-- CreateTable
CREATE TABLE "UserGoalWeightHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGoalWeightHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserGoalWeightHistory_userId_date_idx" ON "UserGoalWeightHistory"("userId", "date");

-- AddForeignKey
ALTER TABLE "UserGoalWeightHistory" ADD CONSTRAINT "UserGoalWeightHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
