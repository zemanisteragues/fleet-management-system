# ************************************************************
# Sequel Ace SQL dump
# Version 20046
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.0.32)
# Database: fms
# Generation Time: 2023-06-13 00:20:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastLoginDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `username`, `email`, `password`, `firstname`, `lastname`, `isActive`, `createDate`, `updateDate`, `lastLoginDate`, `avatar`)
VALUES
	(1,'admin','admin@example.com','$2b$10$MyQz/SBZiYKQ9XW0uLsx6.D0y6Cg7PEUSSW6u8iVU/41cUJ2rlXfe','John','Doe',1,'2023-04-26 23:10:09','2023-04-26 23:10:09','2023-04-26 23:10:09',NULL),
	(2,'johndoe','johndoe@example.com','$2b$10$XDTH.cSkRwbzNcgBzJFbZOYl1.0qfaKTj4q7NUbVg5UEtNzG8Y1IS','Bhai','Doe',1,'2023-04-26 23:46:03','2023-05-01 01:46:13','2023-04-26 23:46:03',NULL),
	(7,'somnath','som@example.com','$2b$10$MNvXVwWEcdujnMvVrBqgiOroZKWeF0LeWMO.JlqUUzrTGFMrZkH.e','Som','Nath',1,'2023-04-27 01:17:49','2023-04-27 01:17:49','2023-04-27 01:17:49',NULL),
	(8,'ankit','ankit@example.com','$2b$10$0.Vmr3k0Jt465HSIIAEtD.CoLQbJmB5/qGMMLrAKV/nNAVS38h5gS','Ankit','Parikh',1,'2023-05-02 14:15:49','2023-05-02 14:15:49','2023-05-02 14:15:49',NULL),
	(9,'vimanyu','vimanyu@example.com','$2b$10$InL3SJXLJWmVGkgTltDaLOjedhMH.YNBQ.FfnrwQ0bevNdGXNy2ea','Vimanyu','Sharma',1,'2023-05-02 15:20:28','2023-05-02 15:20:28','2023-05-02 15:20:28',NULL);

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bookings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `car_id` int DEFAULT NULL,
  `bookedByPassengerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bookedByPassengerPhone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dutyStartDateAndTime` datetime DEFAULT NULL,
  `dutyEndDateAndTime` timestamp NULL DEFAULT NULL,
  `ignoreLastDay` tinyint(1) DEFAULT NULL,
  `dutyType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `basePrice` decimal(8,2) DEFAULT NULL,
  `perExtraKmPrice` decimal(8,2) DEFAULT NULL,
  `perExtraHrPrice` decimal(8,2) DEFAULT NULL,
  `dutyStartKm` int DEFAULT NULL,
  `dutyEndKm` int DEFAULT NULL,
  `tollTax` decimal(8,2) DEFAULT NULL,
  `tollUpload` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dutySlipsUpload` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `startFrom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `endTo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` enum('open','close','cancel') NOT NULL DEFAULT 'open',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `driver_id` (`driver_id`),
  KEY `car_id` (`car_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `Drivers` (`id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`car_id`) REFERENCES `Cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;

INSERT INTO `bookings` (`id`, `customer_id`, `driver_id`, `car_id`, `bookedByPassengerName`, `bookedByPassengerPhone`, `dutyStartDateAndTime`, `dutyEndDateAndTime`, `ignoreLastDay`, `dutyType`, `basePrice`, `perExtraKmPrice`, `perExtraHrPrice`, `dutyStartKm`, `dutyEndKm`, `tollTax`, `tollUpload`, `dutySlipsUpload`, `startFrom`, `endTo`, `status`, `createdAt`, `updatedAt`)
VALUES
	(1,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(2,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,100,965,100.00,'','','Udaipur','Jaipur','cancel','2023-06-09 20:39:35','2023-06-12 04:25:02'),
	(3,45,6,81,'Jason1','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','cancel','2023-06-09 18:06:15','2023-06-12 03:11:52'),
	(4,45,6,81,'Jason2','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','cancel','2023-06-09 18:06:15','2023-06-12 04:25:52'),
	(5,45,6,81,'Jason3','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','cancel','2023-06-09 18:06:15','2023-06-12 04:26:18'),
	(6,45,6,81,'Jason4','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','cancel','2023-06-09 18:06:15','2023-06-12 04:26:54'),
	(7,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(8,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(9,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(10,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(11,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(12,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(13,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(14,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(15,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(16,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(17,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(18,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(19,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(20,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(21,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(22,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(23,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','open','2023-06-09 18:06:15','2023-06-13 02:58:44'),
	(24,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(25,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(26,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(27,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(28,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(29,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(30,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(31,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(32,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(33,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(34,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(35,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(36,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(37,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(38,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(39,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(40,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(41,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(42,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(43,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(44,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(45,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(46,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(47,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(48,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(49,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(50,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(51,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(52,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(53,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(54,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(55,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(56,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(57,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(58,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(59,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(60,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(61,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(62,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(63,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(64,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(65,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(66,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(67,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(68,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(69,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(70,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(71,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(72,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(73,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(74,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(75,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(76,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(77,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(78,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(79,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(80,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(81,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(82,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(83,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(84,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(85,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(86,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(87,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,120,965,100.00,'','','Udaipur','Jaipur','close','2023-06-09 18:06:15','2023-06-09 21:07:24'),
	(88,45,6,81,'Jason','9923821321','2023-06-07 03:45:00','2023-06-09 03:45:00',0,'8h80km',1200.00,10.00,100.00,100,965,100.00,'','','Udaipur','Jaipur','open','2023-06-13 02:56:13','2023-06-13 02:56:13'),
	(89,2,1,6,'Som','','2023-06-02 02:57:00','2023-06-13 02:57:35',0,'300km',1299.00,10.00,100.00,111,823,100.00,'null',NULL,'Mumbai','Pune','cancel','2023-06-13 02:58:11','2023-06-13 03:33:55'),
	(90,4,8,8,'Jason','9923821321','2023-06-07 03:02:00','2023-06-13 03:02:54',0,'4h40km',1299.00,10.00,100.00,111,1000,10.00,'null',NULL,'Udaipur','Pune','open','2023-06-13 03:04:24','2023-06-13 03:04:24'),
	(91,6,5,65,'Som','9923821321','2023-05-30 03:07:00','2023-06-13 03:07:56',0,'300km',1200.00,10.00,10.00,111,965,100.00,'null','1686605910912-TIST-MEDIA-REVISED-lOGO-transparent.png','Mumbai','Pune','open','2023-06-13 03:08:30','2023-06-13 03:08:30'),
	(92,1,9,5,'Ankit','8762342121','2023-06-08 14:03:00','2023-06-13 03:07:56',0,'300km',1200.00,10.00,10.00,87623,98321,10.00,'1686606399838-TIST-MEDIA-REVISED-lOGO-transparent.png','1686606399839-FxOpcHrX0AAZAHe.jpeg','Jhansi','Ranchi','open','2023-06-13 03:16:39','2023-06-13 03:16:39'),
	(93,2,6,6,'Jason','9923821321','2023-06-07 03:07:00','2023-06-10 03:07:00',0,'250km',1200.00,10.00,10.00,111,823,100.00,'1686606615961-FxNnciUXwAEdO6H.jpeg','1686606615964-FxOpcHrX0AAZAHe.jpeg','Jhansi','Pune','cancel','2023-06-13 03:20:16','2023-06-13 05:48:18'),
	(94,8,9,95,'Jason','9923821321','2023-06-06 03:29:00','2023-06-10 03:29:00',0,'300km',1299.00,10.00,100.00,7623,23432,100.00,'1686607199701-1zodx6vjl00b1.png,1686607199702-FwGvdJfaYAAnhzj.jpeg,1686607199707-FxNnciUXwAEdO6H.jpeg','1686607199699-FxNncsZXsAA2G85.jpeg','Jhansi','Ranchi','cancel','2023-06-13 03:29:59','2023-06-13 05:49:06'),
	(96,43,10,65,'Smoker','8234818211','2023-06-07 05:30:00','2023-06-13 05:30:10',0,'300km',1299.00,10.00,100.00,4566,8564,100.00,NULL,'null','Delhi','Jaipur','open','2023-06-13 05:31:09','2023-06-13 05:31:09');

/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cars
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cars`;

CREATE TABLE `cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registrationNumber` varchar(20) NOT NULL,
  `carType` varchar(50) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registrationNumber` (`registrationNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;

INSERT INTO `cars` (`id`, `registrationNumber`, `carType`, `isActive`, `createdAt`, `updatedAt`)
VALUES
	(1,'MH 12 AB 1231','SUV',0,'2023-04-27 02:05:02','2023-05-19 14:56:35'),
	(3,'MH 12 AB 1234','1SUV',1,'2023-04-01 12:30:45','2023-05-19 15:59:08'),
	(4,'KA 05 XY 5678','SUV',1,'2023-04-15 14:25:50','2023-05-02 15:23:29'),
	(5,'DL 03 GJ 9012','Crysta',1,'2023-04-22 10:10:30','2023-05-11 15:53:53'),
	(6,'TN 07 CD 3456','SUV',1,'2023-04-28 18:40:12','2023-05-02 15:23:35'),
	(7,'AP 29 EF 7890','SUV',1,'2023-04-30 09:35:25','2023-05-02 15:23:38'),
	(8,'MH 12 AB 3221','SUV',0,'2023-05-04 14:54:03','2023-05-19 10:24:48'),
	(65,'KA01AB1234','Maruti Swift - Red - 5 seats',1,'2023-05-19 13:06:11','2023-05-19 13:06:11'),
	(66,'TN05BC5678','Hyundai i20 - Blue - 5 seats',1,'2023-05-19 13:06:11','2023-05-19 13:06:11'),
	(67,'AP09CD9012','Tata Nexon - Black - 5 seats',1,'2023-05-19 13:06:11','2023-05-19 13:06:11'),
	(68,'WB11EF3456','Mahindra XUV500 - Silver - 7 seats',1,'2023-05-19 13:06:11','2023-05-19 13:06:11'),
	(69,'KL13GH7890','Honda City - White - 5 seats',1,'2023-05-19 13:06:11','2023-05-19 13:06:11'),
	(70,'MH15IJ6789','Tata Harrier - Grey - 5 seats',1,'2023-05-19 13:06:11','2023-05-19 13:06:11'),
	(71,'GJ17KL1230','Maruti Suzuki Baleno - Blue - 5 seats',1,'2023-05-19 13:06:11','2023-05-19 13:06:11'),
	(79,'KA01AB1231','Maruti Swift - Red - 5 seats',1,'2023-05-19 13:06:26','2023-05-19 13:06:26'),
	(80,'TN05BC5671','Hyundai i20 - Blue - 5 seats',1,'2023-05-19 13:06:26','2023-05-19 13:06:26'),
	(81,'AP09CD9011','Tata Nexon - Black - 5 seats',1,'2023-05-19 13:06:26','2023-05-19 13:06:26'),
	(82,'WB11EF3451','Mahindra XUV500 - Silver - 7 seats',1,'2023-05-19 13:06:26','2023-05-19 13:06:26'),
	(83,'KL13GH7891','Honda City - White - 5 seats',1,'2023-05-19 13:06:26','2023-05-19 13:06:26'),
	(84,'MH15IJ6781','Tata Harrier - Grey - 5 seats',1,'2023-05-19 13:06:26','2023-05-19 13:06:26'),
	(85,'GJ17KL1231','Maruti Suzuki Baleno - Blue - 5 seats',1,'2023-05-19 13:06:26','2023-05-19 13:06:26'),
	(93,'KA01AB1232','Maruti Swift - Red - 5 seats',1,'2023-05-19 13:06:49','2023-05-19 13:06:49'),
	(94,'TN05BC5672','Hyundai i20 - Blue - 5 seats',1,'2023-05-19 13:06:49','2023-05-19 13:06:49'),
	(95,'AP09CD9014','Tata Nexon - Black - 5 seats',1,'2023-05-19 13:06:49','2023-05-19 13:06:49'),
	(96,'WB11EF3452','Mahindra XUV500 - Silver - 7 seats',1,'2023-05-19 13:06:49','2023-05-19 13:06:49'),
	(97,'KL13GH7892','Honda City - White - 5 seats',1,'2023-05-19 13:06:49','2023-05-19 13:06:49'),
	(98,'MH15IJ6782','Tata Harrier - Grey - 5 seats',1,'2023-05-19 13:06:49','2023-05-19 13:06:49'),
	(99,'GJ17KL1232','Maruti Suzuki Baleno - Blue - 5 seats',1,'2023-05-19 13:06:49','2023-05-19 13:06:49'),
	(100,'RJ26JD9919','Ford Black 8',1,'2023-05-19 16:06:57','2023-05-19 16:06:57');

/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table company_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company_info`;

CREATE TABLE `company_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `country` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gstNumber` varchar(20) NOT NULL,
  `panNumber` varchar(20) NOT NULL,
  `website` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `bankBranch` varchar(255) NOT NULL,
  `bankAccountNumber` varchar(50) NOT NULL,
  `bankAccountHolderName` varchar(255) NOT NULL,
  `bankIFSCCode` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isCompany` tinyint(1) NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `gstNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `phone_2` (`phone`),
  UNIQUE KEY `phone_3` (`phone`),
  UNIQUE KEY `gstNumber` (`gstNumber`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;

INSERT INTO `customers` (`id`, `isCompany`, `firstName`, `lastName`, `email`, `companyName`, `gstNumber`, `phone`, `address`, `city`, `state`, `country`, `remarks`, `isActive`, `createdAt`, `updatedAt`)
VALUES
	(1,1,NULL,NULL,NULL,'ABC Inc.','GST123','1234567890','123 Main St.','Mumbai','Maharashtra','India',NULL,0,'2023-04-27 13:48:22','2023-04-29 04:07:45'),
	(2,1,NULL,NULL,NULL,'XYZ Corp.','GST456','9876543210','456 Oak St.','Bangalore','Karnataka','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 13:59:54'),
	(3,1,NULL,NULL,NULL,'Acme Ltd.','GST789','5551234567','789 Maple Ave.','Chennai','Tamil Nadu','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 13:59:55'),
	(4,1,NULL,NULL,NULL,'Globex Corp.','GST246','2225558888','321 Elm St.','Hyderabad','Telangana','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 13:59:56'),
	(5,1,NULL,NULL,NULL,'Initech LLC','GST135','4447779999','456 5th Ave.','Kolkata','West Bengal','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 13:59:56'),
	(6,1,NULL,NULL,NULL,'Mega Corp.','GST468','3331112222','789 Park Ave.','Delhi','Delhi','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 13:59:57'),
	(7,1,NULL,NULL,NULL,'Nakatomi Trading','GST791','8885554444','123 1st St.','Pune','Maharashtra','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 13:59:58'),
	(8,1,NULL,NULL,NULL,'Oscorp Industries','GST357','9998887777','456 Pine St.','Jaipur','Rajasthan','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 13:59:59'),
	(9,1,NULL,NULL,NULL,'Umbrella Corp.','GST248','1112223333','789 Oak St.','Ahmedabad','Gujarat','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 14:00:00'),
	(10,1,NULL,NULL,NULL,'Wayne Enterprises','GST469','7774441111','321 Maple Ave.','Chandigarh','Punjab','India',NULL,1,'2023-04-27 13:48:22','2023-04-27 14:00:01'),
	(21,0,'Amit','Singh',NULL,'Amit Enterprises','GST001','9833098765','123 Main St.','Mumbai','Maharashtra','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(22,0,'Anjali','Patil',NULL,NULL,NULL,'9833098766','456 Oak St.','Bangalore','Karnataka','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(23,0,'Avinash','Rao',NULL,'Rao Associates','GST003','9833098767','789 Maple Ave.','Chennai','Tamil Nadu','India',NULL,0,'2023-04-27 14:25:24','2023-05-19 10:17:50'),
	(24,0,'Devanshi','Shah',NULL,NULL,NULL,'9833098768','321 Elm St.','Hyderabad','Telangana','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(25,0,'Gaurav','Gupta',NULL,'Gupta Corp','GST004','9833098769','456 5th Ave.','Kolkata','West Bengal','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(26,0,'Kavya','Mehra',NULL,NULL,NULL,'9833098770','789 Park Ave.','Delhi','Delhi','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(27,0,'Nikhil','Sharma',NULL,NULL,NULL,'9833098771','123 1st St.','Pune','Maharashtra','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(28,0,'Pooja','Patel',NULL,NULL,NULL,'9833098772','456 Pine St.','Jaipur','Rajasthan','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(29,0,'Rahul','Iyer',NULL,'Iyer Corp','GST006','9833098773','789 Oak St.','Ahmedabad','Gujarat','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(30,0,'Sneha','Shah',NULL,NULL,NULL,'9833098774','321 Maple Ave.','Chandigarh','Punjab','India',NULL,0,'2023-04-27 14:25:24','2023-05-19 09:49:26'),
	(31,0,'Vikram','Rathore',NULL,'Rathore Enterprises','GST007','9833098775','123 Elm St.','Mumbai','Maharashtra','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(32,0,'Aarav','Kumar',NULL,NULL,NULL,'9833098776','456 Oak St.','Bangalore','Karnataka','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(33,0,'Avani','Gupta',NULL,'Gupta Enterprises','GST008','9833098777','789 Maple Ave.','Chennai','Tamil Nadu','India',NULL,0,'2023-04-27 14:25:24','2023-05-19 09:49:08'),
	(34,0,'Kabir','Rao',NULL,NULL,NULL,'9833098778','321 Elm St.','Hyderabad','Telangana','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(35,0,'Shreya','Sharma',NULL,NULL,NULL,'9833098779','456 5th Ave.','Kolkata','West Bengal','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(36,0,'Vivaan','Mehra',NULL,NULL,NULL,'9833098780','789 Park Ave.','Delhi','Delhi','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(37,0,'Kartik','Iyer',NULL,NULL,NULL,'9833098782','789 Oak St.','Ahmedabad','Gujarat','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(38,0,'Isha','Shah',NULL,NULL,NULL,'9833098783','321 Maple Ave.','Chandigarh','Punjab','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(39,0,'Sahil','Rathore',NULL,NULL,NULL,'9833098784','123 Main St.','Mumbai','Maharashtra','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(40,0,'Aaradhya','Kaur',NULL,'Kaur Industries','GST012','9833098785','456 Oak St.','Bangalore','Karnataka','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(41,0,'Aryan','Singh',NULL,NULL,NULL,'9833098786','789 Maple Ave.','Chennai','Tamil Nadu','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(42,0,'Ananya','Rao',NULL,'Rao Industries','GST013','9833098787','321 Elm St.','Hyderabad','Telangana','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(43,0,'Sarthak','Shah',NULL,NULL,NULL,'9833098788','456 5th Ave.','Kolkata','West Bengal','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(44,0,'Trisha','Gupta',NULL,'Gupta Enterprises','GST014','9833098789','789 Park Ave.','Delhi','Delhi','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(45,0,'Aahan','Mehra',NULL,NULL,NULL,'9833098790','123 Pine St.','Jaipur','Rajasthan','India',NULL,1,'2023-04-27 14:25:24','2023-04-27 14:25:24'),
	(46,1,'','',NULL,'Tech Company',NULL,'9873423122','4, BL Road','Bangalore','Karnataka','India',NULL,1,'2023-05-11 09:25:32','2023-05-11 09:25:32'),
	(48,0,'Ankit','Parikh',NULL,'',NULL,'23484223','82, BS Street','Jaipur','Rajasthan','India',NULL,1,'2023-05-11 09:34:22','2023-05-11 09:34:22'),
	(49,1,'','',NULL,'Nova Tech',NULL,'9001832232','9, IJK, Lane','Bangalore','Rajasthan','India',NULL,1,'2023-05-12 04:29:24','2023-05-19 12:57:46'),
	(50,1,'','',NULL,'TestCompanyNoGST','983309876711','982345121','4, SomePlace','SomeCity','SOmeState','SomeCountry',NULL,1,'2023-05-19 09:40:31','2023-05-19 15:27:32'),
	(51,1,'','','som@abcdef.com','AB Company','98330987671','9116625977','23424','Udaipru','Rajasthan','India','Some remarks',1,'2023-05-19 10:17:07','2023-05-19 13:38:34'),
	(57,0,'TestFirstName','TestSecondName','testNewOneTwo@test.com','','','98234724324','234234,32423','Jhansi','MP','India','',1,'2023-05-19 15:25:30','2023-05-19 15:25:30');

/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table drivers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `drivers`;

CREATE TABLE `drivers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `licenseNumber` varchar(50) NOT NULL,
  `licenseExpiry` date NOT NULL,
  `licenseImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_license_number` (`licenseNumber`),
  UNIQUE KEY `unique_phone_number` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;

INSERT INTO `drivers` (`id`, `firstName`, `lastName`, `phone`, `address`, `licenseNumber`, `licenseExpiry`, `licenseImage`, `isActive`, `createdAt`, `updatedAt`)
VALUES
	(1,'John','Doe','1234567890','123 Main St','1234567890','2021-01-01',NULL,0,'2023-04-27 02:24:44','2023-05-19 16:01:32'),
	(2,'Test','Doe','1234567891','123 Main St','1234567891','2021-01-01','1686604528039-TIST-MEDIA-REVISED-lOGO-transparent.png',1,'2023-04-27 02:24:46','2023-06-13 02:45:28'),
	(5,'Sam','Doe','1234567893','123 Main St','1234567893','2021-01-01',NULL,1,'2023-04-27 02:27:29','2023-05-19 16:01:27'),
	(6,'Amit','Sharma','9876543210','123 Main Street, Mumbai','DL-123456789','2025-12-31',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:00:15'),
	(7,'Bhavesh','Patel','8765432109','456 Second Street, Delhi','DL-987654321','2024-06-30',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(8,'Chetan','Gupta','7654321098','789 Third Street, Chennai','DL-246810121','2023-03-31',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(9,'Dhruv','Singh','6543210987','321 Fourth Street, Bangalore','DL-369121518','2022-09-30',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(10,'Esha','Rao','5432109876','654 Fifth Street, Hyderabad','DL-151413161','2026-01-31',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(11,'Farhan','Khan','4321098765','987 Sixth Street, Pune','DL-765432109','2027-04-30',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(12,'Gaurav','Joshi','3210987654','210 Seventh Street, Kolkata','DL-111213141','2028-12-31',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(13,'Himani','Shah','2109876543','543 Eighth Street, Ahmedabad','DL-516171819','2029-07-31',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(14,'Ishaan','Pandey','1098765432','876 Ninth Street, Jaipur','DL-202122232','2030-02-28',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(15,'Jaya','Verma','0987654321','109 Tenth Street, Lucknow','DL-242526272','2031-05-31',NULL,1,'2023-05-03 17:30:16','2023-05-19 16:01:09'),
	(16,'som','nath','9117725988','4, nand bhawan','23422','2023-05-03',NULL,1,'2023-05-04 13:36:18','2023-05-11 04:35:23'),
	(17,'Partha','Arora','9234232453','hello world','923223','2023-05-26',NULL,1,'2023-05-04 13:44:29','2023-05-11 04:35:23'),
	(18,'test','driver','9923242324','test addrsss','23234','2023-05-22',NULL,1,'2023-05-04 14:23:34','2023-05-11 04:35:23'),
	(19,'Chirag','Jain','923423423','2asdf\nasdfaf \nasdfa','234234','2023-05-12',NULL,1,'2023-05-04 17:39:28','2023-05-11 04:35:23'),
	(20,'Dash','Jain','94353243234','4, adk phore','83458345','2023-06-02','1683842748971-1575975196317 (1).jpeg',1,'2023-05-12 03:35:49','2023-05-12 03:35:49'),
	(21,'Partha','Arora','23436436','165, Jeevantara, Goverdhan Vilas,','56742345','2023-05-02','1683844259234-1635988509026.jpeg',1,'2023-05-12 04:00:59','2023-05-12 04:00:59'),
	(23,'Partha','Arora','9383458345','165, Jeevantara, Goverdhan Vilas,','5674234523','2023-05-02','1683844302126-1635988509026.jpeg',1,'2023-05-12 04:01:42','2023-05-12 04:01:42'),
	(30,'Parthaasdf','Arora','23453452345','165, Jeevantara, Goverdhan Vilas,','56742345231','2023-05-02','1683844556458-1635988509026.jpeg',1,'2023-05-12 04:05:56','2023-05-12 04:05:56'),
	(31,'Hemant','Sanadhya','992802259','Sector 14','122345345','2023-05-24','1684085839462-1536511331498.jpeg',1,'2023-05-14 23:07:19','2023-05-14 23:07:19');

/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table duty_slips
# ------------------------------------------------------------

DROP TABLE IF EXISTS `duty_slips`;

CREATE TABLE `duty_slips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carId` int NOT NULL,
  `driverId` int NOT NULL,
  `customerId` int NOT NULL,
  `invoiceId` int DEFAULT NULL,
  `passengerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `passengerPhone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `extraTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `imageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `carId` (`carId`),
  KEY `driverId` (`driverId`),
  KEY `customerId` (`customerId`),
  KEY `duty_slips_ibfk_4` (`invoiceId`),
  CONSTRAINT `duty_slips_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`),
  CONSTRAINT `duty_slips_ibfk_2` FOREIGN KEY (`driverId`) REFERENCES `drivers` (`id`),
  CONSTRAINT `duty_slips_ibfk_3` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`),
  CONSTRAINT `duty_slips_ibfk_4` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `duty_slips` WRITE;
/*!40000 ALTER TABLE `duty_slips` DISABLE KEYS */;

INSERT INTO `duty_slips` (`id`, `carId`, `driverId`, `customerId`, `invoiceId`, `passengerName`, `passengerPhone`, `extraTime`, `imageUrl`, `isActive`, `createdAt`, `updatedAt`)
VALUES
	(1,5,6,45,NULL,'som','9116625977','0',NULL,1,'2023-05-04 03:54:51','2023-05-11 15:53:38'),
	(2,5,6,45,NULL,'som','9116625977','0',NULL,1,'2023-05-04 03:56:10','2023-05-11 15:53:37'),
	(3,5,6,45,NULL,'som','9116625977','0',NULL,1,'2023-05-04 03:56:28','2023-05-04 04:22:51'),
	(4,5,6,45,NULL,'som','9116625977','0',NULL,1,'2023-05-04 03:57:44','2023-05-04 04:22:51'),
	(5,4,7,21,NULL,'som','9116625977','0',NULL,0,'2023-05-04 03:59:45','2023-05-12 12:48:16'),
	(6,4,7,21,NULL,'som','9116625977','0',NULL,0,'2023-05-04 04:05:45','2023-05-11 15:49:52'),
	(7,4,7,21,NULL,'som','9116625977','0',NULL,0,'2023-05-04 04:11:15','2023-05-12 12:48:19'),
	(8,4,7,21,NULL,'som','9116625977','0',NULL,1,'2023-05-04 04:13:30','2023-05-04 04:22:51'),
	(9,4,7,21,NULL,'som','9116625977','0',NULL,1,'2023-05-04 04:14:04','2023-05-04 04:22:51'),
	(10,4,7,21,NULL,'som','9116625977','0',NULL,1,'2023-05-04 04:17:49','2023-05-04 04:22:51'),
	(11,4,7,21,NULL,'som','9116625977','0',NULL,1,'2023-05-04 04:20:28','2023-05-04 04:22:51'),
	(12,4,7,21,NULL,'som','9116625977','0',NULL,1,'2023-05-04 04:20:44','2023-05-04 04:22:51'),
	(13,4,7,21,NULL,'som','9116625977','0',NULL,1,'2023-05-04 04:20:58','2023-05-04 04:22:51'),
	(14,4,7,21,NULL,'som','9116625977','0',NULL,1,'2023-05-04 04:21:40','2023-05-04 04:22:51'),
	(15,3,11,33,NULL,'Vijay','634272311','2',NULL,1,'2023-05-04 15:53:09','2023-05-04 15:53:09'),
	(16,8,15,22,NULL,'devesh','2342342342','2',NULL,1,'2023-05-04 15:55:20','2023-05-11 15:53:35'),
	(17,4,19,7,NULL,'Naresh','9322423223','0',NULL,1,'2023-05-11 03:59:45','2023-05-11 15:53:37'),
	(18,8,9,32,5,'Som','9116625977','0',NULL,1,'2023-05-11 16:05:54','2023-05-15 16:42:23'),
	(19,4,11,42,NULL,'Som','9116625977','0',NULL,1,'2023-05-11 16:06:25','2023-05-11 16:06:25'),
	(20,3,10,32,5,'Som','87567434545','1',NULL,1,'2023-05-11 16:09:22','2023-05-15 16:42:23'),
	(21,3,12,5,NULL,'Parth Arora','98877665544','1',NULL,1,'2023-05-12 17:21:42','2023-05-12 17:21:42');

/*!40000 ALTER TABLE `duty_slips` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table invoices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoices`;

CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` int NOT NULL,
  `billed_to` varchar(255) NOT NULL,
  `gstin` varchar(15) DEFAULT NULL,
  `customer_id` int NOT NULL,
  `customer_phone` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `shipped_to` text NOT NULL,
  `representative` text NOT NULL,
  `place_of_service` varchar(255) DEFAULT NULL,
  `invoice_date` timestamp NOT NULL,
  `cgst` decimal(10,2) NOT NULL,
  `sgst` decimal(10,2) NOT NULL,
  `igst` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `sub_total` decimal(10,2) NOT NULL,
  `invoice_status` enum('CREATED','SENT','PAID','PARTIALLY_PAID','OVERDUE','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'CREATED',
  `isActive` tinyint(1) DEFAULT '1',
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;

INSERT INTO `invoices` (`id`, `invoice_number`, `billed_to`, `gstin`, `customer_id`, `customer_phone`, `address`, `shipped_to`, `representative`, `place_of_service`, `invoice_date`, `cgst`, `sgst`, `igst`, `total`, `sub_total`, `invoice_status`, `isActive`, `createdDate`, `updatedDate`)
VALUES
	(3,1,'Aarav Kumar',NULL,32,'9833098776','456 Oak St., Bangalore, Karnataka, India','456 Oak St., Bangalore, Karnataka, India','[\"Som (87567434545)\",\"Som (9116625977)\"]','','2023-05-15 15:07:58',318.30,318.30,636.60,13368.60,12732.00,'CANCELLED',1,'2023-05-15 15:11:16','2023-05-15 18:34:51'),
	(5,5,'Aarav Kumar',NULL,32,'9833098776','456 Oak St., Bangalore, Karnataka, India','456 Oak St., Bangalore, Karnataka, India','[\"Som (87567434545)\",\"Som (9116625977)\"]','','2023-05-15 16:40:31',791.18,791.18,1582.35,33229.35,31647.00,'PAID',1,'2023-05-15 16:42:23','2023-06-12 23:08:31');

/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table invoices_trips
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoices_trips`;

CREATE TABLE `invoices_trips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `trip_id` int NOT NULL,
  `duty_slip_id` int NOT NULL,
  `start_date` timestamp NOT NULL,
  `release_date` timestamp NOT NULL,
  `starting_km` int NOT NULL,
  `closing_km` int NOT NULL,
  `total_km` int NOT NULL,
  `pickup_location` varchar(255) NOT NULL,
  `drop_location` varchar(255) NOT NULL,
  `fare` decimal(10,2) NOT NULL,
  `fuel_per_km` decimal(10,2) NOT NULL,
  `toll` decimal(10,2) NOT NULL,
  `night_halt` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `trip_id` (`trip_id`),
  KEY `duty_slip_id` (`duty_slip_id`),
  CONSTRAINT `invoices_trips_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `invoices_trips_ibfk_2` FOREIGN KEY (`trip_id`) REFERENCES `trip_details` (`id`),
  CONSTRAINT `invoices_trips_ibfk_3` FOREIGN KEY (`duty_slip_id`) REFERENCES `duty_slips` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `invoices_trips` WRITE;
/*!40000 ALTER TABLE `invoices_trips` DISABLE KEYS */;

INSERT INTO `invoices_trips` (`id`, `invoice_id`, `trip_id`, `duty_slip_id`, `start_date`, `release_date`, `starting_km`, `closing_km`, `total_km`, `pickup_location`, `drop_location`, `fare`, `fuel_per_km`, `toll`, `night_halt`, `total`, `isActive`, `createdDate`, `updatedDate`)
VALUES
	(1,3,5,18,'2023-05-10 21:37:00','2023-05-12 21:38:00',231,232,1,'Jaipur','Udaipur',1250.00,10.00,1000.00,1000.00,3260.00,1,'2023-05-15 15:11:16','2023-05-15 15:11:16'),
	(2,3,7,20,'2023-05-14 21:41:00','2023-05-13 02:39:00',1232,4343,3111,'Jaipur','Udaipur',1250.00,2.00,1000.00,1000.00,9472.00,1,'2023-05-15 15:11:16','2023-05-15 15:11:16'),
	(5,5,5,18,'2023-05-10 21:37:00','2023-05-12 21:38:00',231,232,1,'Jaipur','Udaipur',1250.00,10.00,1000.00,120.00,2380.00,1,'2023-05-15 16:42:23','2023-05-15 16:42:23'),
	(6,5,7,20,'2023-05-14 21:41:00','2023-05-13 02:39:00',1232,4343,3111,'Jaipur','Udaipur',1250.00,9.00,9.00,9.00,29267.00,1,'2023-05-15 16:42:23','2023-05-15 16:42:23');

/*!40000 ALTER TABLE `invoices_trips` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trip_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trip_details`;

CREATE TABLE `trip_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dutySlipId` int NOT NULL,
  `start_date` datetime NOT NULL,
  `release_date` datetime NOT NULL,
  `startingKm` int NOT NULL,
  `closingKm` int NOT NULL,
  `totalKM` int NOT NULL,
  `pickupLocation` varchar(100) NOT NULL,
  `dropLocation` varchar(100) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `dutySlipId` (`dutySlipId`),
  CONSTRAINT `trip_details_ibfk_1` FOREIGN KEY (`dutySlipId`) REFERENCES `duty_slips` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `trip_details` WRITE;
/*!40000 ALTER TABLE `trip_details` DISABLE KEYS */;

INSERT INTO `trip_details` (`id`, `dutySlipId`, `start_date`, `release_date`, `startingKm`, `closingKm`, `totalKM`, `pickupLocation`, `dropLocation`, `isActive`, `createdAt`, `updatedAt`)
VALUES
	(1,14,'2023-05-10 10:29:00','2023-05-03 10:29:00',32,3232,3200,'jaipur','jaipur',1,'2023-05-04 04:21:40','2023-05-04 04:22:14'),
	(2,14,'2023-05-01 08:31:00','2023-05-01 11:29:00',3232,234554,231322,'udaipur','rajasth',1,'2023-05-04 04:21:40','2023-05-04 04:22:15'),
	(3,16,'2023-05-12 23:29:00','2023-05-03 00:29:00',23423,23429,6,'udaiupu','mumbai',1,'2023-05-04 15:55:20','2023-05-04 15:55:20'),
	(4,17,'2023-05-25 10:32:00','2023-05-23 11:33:00',2323,6345,4022,'Jaipur','Udaipur',1,'2023-05-11 03:59:45','2023-05-11 03:59:45'),
	(5,18,'2023-05-10 21:37:00','2023-05-12 21:38:00',231,232,1,'Jaipur','Udaipur',1,'2023-05-11 16:05:54','2023-05-11 16:05:54'),
	(6,19,'2023-05-10 21:37:00','2023-05-12 21:38:00',231,232,1,'Jaipur','Udaipur',1,'2023-05-11 16:06:25','2023-05-11 16:06:25'),
	(7,20,'2023-05-14 21:41:00','2023-05-13 02:39:00',1232,4343,3111,'Jaipur','Udaipur',1,'2023-05-11 16:09:22','2023-05-11 16:09:22'),
	(8,21,'2023-05-17 22:53:00','2023-05-03 22:54:00',325,421,96,'Udaipur','Jaipur',1,'2023-05-12 17:21:42','2023-05-12 17:21:42'),
	(9,21,'2023-05-01 22:54:00','2023-05-20 22:54:00',111,222,111,'Ooty','Punjab',1,'2023-05-12 17:21:42','2023-05-12 17:21:42');

/*!40000 ALTER TABLE `trip_details` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
