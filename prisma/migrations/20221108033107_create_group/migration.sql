-- CreateTable
CREATE TABLE `Group` (
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(1000) NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
