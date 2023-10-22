/*
  Warnings:

  - You are about to drop the column `expries` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `expires` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `expries`,
    ADD COLUMN `expires` INTEGER NOT NULL;
