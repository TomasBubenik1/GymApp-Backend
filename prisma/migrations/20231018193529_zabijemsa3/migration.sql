/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `session`;

-- CreateTable
CREATE TABLE `Sessions` (
    `session_id` VARCHAR(191) NOT NULL,
    `expries` INTEGER NOT NULL,
    `Data` JSON NOT NULL,

    UNIQUE INDEX `Sessions_session_id_key`(`session_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
