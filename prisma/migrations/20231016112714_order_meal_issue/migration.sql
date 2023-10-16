-- DropForeignKey
ALTER TABLE `ordermeal` DROP FOREIGN KEY `OrderMeal_mealId_fkey`;

-- DropForeignKey
ALTER TABLE `ordermeal` DROP FOREIGN KEY `OrderMeal_orderId_fkey`;

-- AddForeignKey
ALTER TABLE `OrderMeal` ADD CONSTRAINT `OrderMeal_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `Meal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderMeal` ADD CONSTRAINT `OrderMeal_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
