-- CreateTable
CREATE TABLE "DailyCalorieIntake" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalCalories" INTEGER NOT NULL,

    CONSTRAINT "DailyCalorieIntake_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyCalorieIntake_date_key" ON "DailyCalorieIntake"("date");

-- CreateIndex
CREATE INDEX "userDateIndex" ON "DailyCalorieIntake"("userId", "date");

-- AddForeignKey
ALTER TABLE "DailyCalorieIntake" ADD CONSTRAINT "DailyCalorieIntake_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
