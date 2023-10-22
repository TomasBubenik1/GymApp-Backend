/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `weightHistory` JSON NULL;

-- DropTable
DROP TABLE `profile`;

-- CreateTable
CREATE TABLE `LikedWorkoutPlan` (
    `userId` INTEGER NOT NULL,
    `workoutPlanId` INTEGER NOT NULL,

    UNIQUE INDEX `LikedWorkoutPlan_userId_key`(`userId`),
    UNIQUE INDEX `LikedWorkoutPlan_workoutPlanId_key`(`workoutPlanId`),
    PRIMARY KEY (`userId`, `workoutPlanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GymEquipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `GymEquipment_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LikedWorkoutPlan` ADD CONSTRAINT `LikedWorkoutPlan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikedWorkoutPlan` ADD CONSTRAINT `LikedWorkoutPlan_workoutPlanId_fkey` FOREIGN KEY (`workoutPlanId`) REFERENCES `WorkoutPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GymEquipment` ADD CONSTRAINT `GymEquipment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
