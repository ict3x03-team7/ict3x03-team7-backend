-- CreateTable
CREATE TABLE `dummy` (
    `DummyID` BINARY(16) NOT NULL DEFAULT (uuid_to_bin(uuid(),true)),
    `Name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`DummyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

