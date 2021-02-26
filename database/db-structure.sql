
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
