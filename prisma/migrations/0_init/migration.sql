-- CreateTable
CREATE TABLE `dummy` (
    `DummyID` BINARY(16) NOT NULL DEFAULT (uuid_to_bin(uuid(),true)),
    `Name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`DummyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file` (
    `FileID` BINARY(16) NOT NULL DEFAULT (uuid_to_bin(uuid(),true)),
    `OriginalFileName` VARCHAR(1024) NOT NULL,
    `FileSize` INTEGER NOT NULL,

    PRIMARY KEY (`FileID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `UserID` BINARY(16) NOT NULL DEFAULT (uuid_to_bin(uuid(),true)),
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(127) NOT NULL,
    `Role` VARCHAR(32) NOT NULL,
    `Gender` VARCHAR(32) NOT NULL,
    `MobileNumber` INTEGER NOT NULL,
    `LastLogin` TIMESTAMP(0) NULL,
    `StudentID` VARCHAR(255) NULL,
    `ProfilePictureID` BINARY(16) NULL DEFAULT (uuid_to_bin(uuid(),true)),
    `MFA_QR` TEXT NULL,
    `MFA_Secret` VARCHAR(255) NULL,

    UNIQUE INDEX `Email`(`Email`),
    INDEX `ProfilePictureIDFK_idx`(`ProfilePictureID`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `ProfilePictureID` FOREIGN KEY (`ProfilePictureID`) REFERENCES `file`(`FileID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

