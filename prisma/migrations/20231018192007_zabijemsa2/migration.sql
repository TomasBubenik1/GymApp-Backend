-- CreateTable
CREATE TABLE `Session` (
    `session_id` VARCHAR(191) NOT NULL,
    `expries` INTEGER NOT NULL,
    `Data` JSON NOT NULL,

    UNIQUE INDEX `Session_session_id_key`(`session_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
