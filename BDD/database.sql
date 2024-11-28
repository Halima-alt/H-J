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

-- Dumping data for table déploiement.automate: ~0 rows (approximately)
INSERT INTO `automate` (`ID_AUTOMATE`, `Nom`, `IP`, `Type`) VALUES
	(1, 'Automate A', '192.168.1.1', 'Type1');

-- Dumping data for table déploiement.tableauvaleur: ~0 rows (approximately)
INSERT INTO `tableauvaleur` (`ID_Valeur`, `Valeur`, `ID_Variable`, `automate_ID`) VALUES
	(1, 100, NULL, NULL);

-- Dumping data for table déploiement.variable: ~4 rows (approximately)
INSERT INTO `variable` (`ID_Variable`, `Nom`, `IP`, `Variable_automate`, `Fréquence`, `Date`, `Unité`, `ID_AUTOMATE`) VALUES
	(1, 'Capteur_Temperature', '192.168.1.10', 'Température', 60, '2024-11-27 08:40:30', 'Celsius', 0),
	(2, 'Capteur_Temperature', '192.168.1.10', 'Température', 60, '2024-11-27 10:53:36', 'Celsius', 0),
	(3, 'Capteur_Temperature', '192.168.1.10', 'Température', 60, '2024-11-27 11:11:34', 'Celsius', 0),
	(4, 'Capteur_Temperature', '192.168.1.10', 'Temperature', 60, '2024-11-27 11:56:10', 'Celsius', NULL),
	(5, 'Capteur_Temperature', '192.168.1.10', 'Temperature', 60, '2024-11-28 09:14:09', 'Celsius', NULL),
	(6, 'Capteur_Temperature', '192.168.1.10', 'Temperature', 60, '2024-11-28 09:25:14', 'Celsius', NULL),
	(7, 'Capteur_Temperature', '192.168.1.10', 'Temperature', 60, '2024-11-28 09:29:46', 'Celsius', NULL),
	(8, 'Capteur_Temperature', '192.168.1.10', 'Temperature', 60, '2024-11-28 09:39:00', 'Celsius', NULL),
	(9, 'Capteur_Temperature', '192.168.1.10', 'Temperature', 60, '2024-11-28 09:39:03', 'Celsius', NULL),
	(10, 'Capteur_Temperature', '192.168.1.10', 'Temperature', 60, '2024-11-28 09:39:16', 'Celsius', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
