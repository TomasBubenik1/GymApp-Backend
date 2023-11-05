/*
  Warnings:

  - You are about to drop the column `aliases` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercise" DROP COLUMN "aliases",
DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "description";
