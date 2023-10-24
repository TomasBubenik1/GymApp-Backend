/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "sessions";

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    "sess" JSONB NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_sid_key" ON "session"("sid");
