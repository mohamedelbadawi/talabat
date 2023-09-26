-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('pending', 'cancelled', 'completed') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `restaurant` MODIFY `status` ENUM('Active', 'InActive') NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `user` MODIFY `status` ENUM('Active', 'InActive') NOT NULL DEFAULT 'Active';
