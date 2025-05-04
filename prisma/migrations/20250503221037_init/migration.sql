-- CreateTable
CREATE TABLE `NftPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nftId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
