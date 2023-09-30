/*
  Warnings:

  - You are about to drop the column `resturantId` on the `meal` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `meal` DROP FOREIGN KEY `Meal_resturantId_fkey`;

-- AlterTable
ALTER TABLE `meal` DROP COLUMN `resturantId`,
    ADD COLUMN `restaurantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
