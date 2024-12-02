-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.5.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table deploiement.automate: ~0 rows (approximately)
USE deploiement

CREATE TABLE `automate` (
    `ID_AUTOMATE` INT(11) NOT NULL AUTO_INCREMENT,
    `Nom` VARCHAR(50) NULL DEFAULT NULL,
    `IP` VARCHAR(50) NULL DEFAULT NULL,
    `Type` VARCHAR(50) NULL DEFAULT NULL,
    PRIMARY KEY (`ID_AUTOMATE`) USING BTREE
);


CREATE TABLE `tableauvaleur` (
    `ID_Valeur` INT(11) NOT NULL AUTO_INCREMENT,
    `Valeur` INT(11) NULL DEFAULT NULL,
    `ID_Variable` INT(11) NULL DEFAULT NULL,
    `automate_ID` INT(11) NULL DEFAULT NULL,
    PRIMARY KEY (`ID_Valeur`) USING BTREE,
    INDEX `ID_Variable` (`ID_Variable`) USING BTREE,
    INDEX `automate_ID` (`automate_ID`) USING BTREE,
    CONSTRAINT `ID_Variable` FOREIGN KEY (`ID_Variable`) REFERENCES `variable` (`ID_Variable`) ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT `automate_ID` FOREIGN KEY (`automate_ID`) REFERENCES `automate` (`ID_AUTOMATE`) ON UPDATE RESTRICT ON DELETE RESTRICT
);


CREATE TABLE `variable` (
    `ID_Variable` INT(11) NOT NULL AUTO_INCREMENT,
    `Nom` VARCHAR(50) NOT NULL DEFAULT '0',
    `IP` VARCHAR(50) NOT NULL DEFAULT '0',
    `Variable_automate` VARCHAR(50) NOT NULL DEFAULT '0',
    `Fréquence` INT(11) NOT NULL DEFAULT '0',
    `Date` DATETIME NOT NULL DEFAULT current_timestamp(),
    `Unité` VARCHAR(50) NOT NULL DEFAULT '0',
    `ID_AUTOMATE` INT(11) NULL DEFAULT NULL,
    PRIMARY KEY (`ID_Variable`) USING BTREE,
    INDEX `ID_AUTOMATE` (`ID_AUTOMATE`) USING BTREE,
    CONSTRAINT `ID_AUTOMATE` FOREIGN KEY (`ID_AUTOMATE`) REFERENCES `automate` (`ID_AUTOMATE`) ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO `automate` (`ID_AUTOMATE`, `Nom`, `IP`, `Type`) VALUES
    (1, 'Automate A', '192.168.1.1', 'Type1');

INSERT INTO `variable` (`ID_Variable`, `Nom`, `IP`, `Variable_automate`, `Fréquence`, `Date`, `Unité`, `ID_AUTOMATE`) VALUES
    (1, 'Capteur_Temperature', '192.168.1.10', 'Température', 60, '2024-11-27 08:40:30', 'Celsius', 1);

INSERT INTO `tableauvaleur` (`ID_Valeur`, `Valeur`, `ID_Variable`, `automate_ID`) VALUES
    (1, 100, 1, 1),
    (2, 10,1,1),
    (3,1,1,1),
    (4,0,1,1);
    
