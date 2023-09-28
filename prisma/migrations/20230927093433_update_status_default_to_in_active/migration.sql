-- AlterTable
ALTER TABLE `restaurant` MODIFY `status` ENUM('Active', 'InActive') NOT NULL DEFAULT 'InActive';
