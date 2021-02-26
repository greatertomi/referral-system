/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.14-MariaDB : Database - referral_system
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`referral_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `referral_system`;

/*Table structure for table `referral_code_usage` */

DROP TABLE IF EXISTS `referral_code_usage`;

CREATE TABLE `referral_code_usage` (
  `usageId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `inviterId` int(50) NOT NULL,
  `inviteeId` int(50) NOT NULL,
  `dateTimeUsed` datetime NOT NULL,
  PRIMARY KEY (`usageId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `referral_code_usage` */

insert  into `referral_code_usage`(`usageId`,`inviterId`,`inviteeId`,`dateTimeUsed`) values 
(2,2,5,'2021-02-25 18:59:57'),
(3,2,7,'2021-02-25 21:26:31'),
(4,2,8,'2021-02-25 21:27:32'),
(5,2,9,'2021-02-25 21:27:56'),
(6,2,10,'2021-02-25 21:28:25');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `email` varchar(200) NOT NULL,
  `dateTimeJoined` datetime NOT NULL,
  `password` varchar(300) NOT NULL,
  `currentCredit` int(50) NOT NULL,
  `referralCode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`userId`,`name`,`email`,`dateTimeJoined`,`password`,`currentCredit`,`referralCode`) values 
(2,'Bilise Makumda','makumda@gmail.com','2021-02-25 18:19:50','$2b$10$Rz60hs0cB5tQ3qLxo2uJ3ur47Ee83and2PXw05o9BRz0FKEG68cd6',5,'40364'),
(5,'Palamo Huskca','huskca@gmail.com','2021-02-25 18:59:57','$2b$10$itdkkl3t7V08JeM0vHgiEOII.OfNL.pNotzqd6A7ThAZhGJk8n/tG',10,'45817'),
(6,'Bob Jones','jones@gmail.com','2021-02-25 21:23:21','$2b$10$Ot1Mz/IBAaaI0X7eJAi7NOOvvGzvnPIRWZ/M5p0Y9GNiYXc1m2tlu',0,'19037'),
(7,'Catmull Blanket','catmull@gmail.com','2021-02-25 21:26:31','$2b$10$3xhtwpNarL.7UD6PFftM2OXBAiR.ahnR82i8.UqO1NFWa1QKhC8vu',10,'79628'),
(8,'Simon Sinek','simon@gmail.com','2021-02-25 21:27:32','$2b$10$fg7DstEX4b6LcaI7Iy0g.ePcpjx/eC0TVywyRXRwT5E75Qp5v4Vu2',10,'73520'),
(9,'Paul Pogba','paul@gmail.com','2021-02-25 21:27:56','$2b$10$4s6yjtkzpH2sRqdxrFcSmeHbDaaq38KqUOOzNtSJrYZv8/Wj4tYcy',10,'71131'),
(10,'Matthew West','matthew@gmail.com','2021-02-25 21:28:25','$2b$10$qDlSv2CnFoKqJ7tcA49T8OLKBnij8wkwLXjnaKpNzx58w.PwvdoTC',10,'11227'),
(11,'Broadland Mob','broadland@gmail.com','2021-02-25 21:29:42','$2b$10$Jucoj.bRWpc9LZhWt09uPuxiM4UaHLekBJBfCU6DAt1qWiaTAC9T.',0,'75181'),
(12,'Broadland Mob','broadland1@gmail.com','2021-02-26 01:13:40','$2b$10$8Czd0GKdqUl7bm3nm5NlW.aZrKhn9OBV/mLro26LkKXzBz72bmjSO',0,'31450');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
