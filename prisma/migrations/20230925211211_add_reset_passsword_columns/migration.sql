-- AlterTable
ALTER TABLE `user` ADD COLUMN `passwordToken` VARCHAR(191) NULL,
    ADD COLUMN `tokenExpireAt` DATETIME(3) NULL,
    ADD COLUMN `tokenVerfied` BOOLEAN NOT NULL DEFAULT false;
