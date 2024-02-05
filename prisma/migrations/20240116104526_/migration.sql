/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LikedPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "LikedPost" DROP CONSTRAINT "LikedPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "LikedPost" DROP CONSTRAINT "LikedPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "LikedPost";

-- DropTable
DROP TABLE "Post";
