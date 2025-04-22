# ************************************************************
# Sequel Ace SQL dump
# Version 20046
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.0.32)
# Database: fms
# Generation Time: 2023-05-19 08:57:39 +0000
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
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `gstNumber` (`gstNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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



# Dump of table invoice_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoice_items`;

CREATE TABLE `invoice_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoiceId` int NOT NULL,
  `dutySlipId` int NOT NULL,
  `tripId` int NOT NULL,
  `baseFare` decimal(10,2) NOT NULL,
  `totalKm` decimal(10,2) NOT NULL,
  `fuelPerKm` decimal(10,2) NOT NULL,
  `nightHaltCharge` decimal(10,2) NOT NULL,
  `tollCharge` decimal(10,2) NOT NULL,
  `isActive` tinyint DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `invoiceId` (`invoiceId`),
  KEY `dutySlipId` (`dutySlipId`),
  KEY `tripId` (`tripId`),
  CONSTRAINT `invoice_items_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`),
  CONSTRAINT `invoice_items_ibfk_2` FOREIGN KEY (`dutySlipId`) REFERENCES `duty_slips` (`id`),
  CONSTRAINT `invoice_items_ibfk_3` FOREIGN KEY (`tripId`) REFERENCES `trip_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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



# Dump of table representatives
# ------------------------------------------------------------

DROP TABLE IF EXISTS `representatives`;

CREATE TABLE `representatives` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `companyId` (`companyId`),
  CONSTRAINT `representatives_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
