-- CreateTable
CREATE TABLE `_GroupToPermission` (
    `A` VARCHAR(100) NOT NULL,
    `B` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `_GroupToPermission_AB_unique`(`A`, `B`),
    INDEX `_GroupToPermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GroupToPermission` ADD CONSTRAINT `_GroupToPermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `Group`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToPermission` ADD CONSTRAINT `_GroupToPermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `Permission`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
