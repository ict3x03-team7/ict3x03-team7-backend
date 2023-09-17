USE EquipHub;

CREATE TABLE `dummy`
(
  `DummyID` BINARY
(16) NOT NULL DEFAULT
(UUID_TO_BIN
(UUID
(), TRUE)),
  `Name` VARCHAR
(255) NOT NULL,
  PRIMARY KEY
(`DummyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `file`
(
  `FileID` BINARY
(16) NOT NULL DEFAULT
(UUID_TO_BIN
(UUID
(), TRUE)),
  `OriginalFileName` VARCHAR
(1024) NOT NULL,
  `FileSize` INT NOT NULL,
  PRIMARY KEY
(`FileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user`
(
  `UserID` BINARY
(16) NOT NULL DEFAULT
(UUID_TO_BIN
(UUID
(), TRUE)),
  `FirstName` VARCHAR
(255) NOT NULL,
  `LastName` VARCHAR
(255) NOT NULL,
  `Email` VARCHAR
(255) NOT NULL UNIQUE,
  `Password` VARCHAR
(32) NOT NULL,
  `Role` VARCHAR
(32) NOT NULL,
  `Gender` VARCHAR
(32) NOT NULL,
  `MobileNumber` INT NOT NULL,
  `LastLogin` TIMESTAMP NULL DEFAULT NULL,
  `PersonnelID` VARCHAR
(255) NULL DEFAULT NULL,
  `ProfilePictureID` BINARY
(16) DEFAULT NULL DEFAULT
(UUID_TO_BIN
(UUID
(), TRUE)),
  PRIMARY KEY
(`UserID`),
 KEY `ProfilePictureIDFK_idx`
(`ProfilePictureID`),
  CONSTRAINT `ProfilePictureID` FOREIGN KEY
(`ProfilePictureID`) REFERENCES `file`
(`FileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
