-- CreateTable
CREATE TABLE "UserProgressData" (
    "userId" INTEGER NOT NULL,
    "currentWeight" DOUBLE PRECISION NOT NULL,
    "goalWeight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProgressData_pkey" PRIMARY KEY ("userId","createdAt")
);

-- AddForeignKey
ALTER TABLE "UserProgressData" ADD CONSTRAINT "UserProgressData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
