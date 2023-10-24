/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "session" (
    "sess" TEXT NOT NULL,
    "expires" INTEGER NOT NULL,
    "Data" JSONB NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sess")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_sess_key" ON "session"("sess");
