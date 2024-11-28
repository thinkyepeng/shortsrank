### 20240308
ALTER TABLE `shortsrank`.`playlets` 
CHANGE COLUMN `intro` `intro` VARCHAR(600) NULL DEFAULT NULL ;

ALTER TABLE `shortsrank`.`videos` 
ADD COLUMN `original_id` INT NULL AFTER `is_delete`;

CREATE TABLE shortsrank.`logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dl` varchar(500) NOT NULL COMMENT '当前网址',
  `dh` varchar(45) NOT NULL COMMENT '当前域名',
  `refer` varchar(500) DEFAULT NULL,
  `uid` varchar(32) DEFAULT NULL,
  `sid` varchar(32) DEFAULT NULL,
  `tid` varchar(32) DEFAULT NULL,
  `cid` varchar(32) DEFAULT NULL,
  `group` varchar(45) DEFAULT NULL,
  `t` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  `z` varchar(20) DEFAULT NULL,
  `ua` varchar(500) DEFAULT NULL,
  `spider` varchar(45) DEFAULT '',
  `ip` varchar(45) DEFAULT NULL,
  `w` smallint DEFAULT '0',
  `h` smallint DEFAULT '0',
  `ec` varchar(45) DEFAULT NULL,
  `ea` varchar(45) DEFAULT NULL,
  `el` varchar(45) DEFAULT NULL,
  `ev` varchar(45) DEFAULT NULL,
  `devicePixelRatio` smallint DEFAULT '1',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid_index` (`uid`),
  KEY `sid_index` (`sid`),
  KEY `tid_index` (`tid`),
  KEY `cid_index` (`cid`),
  KEY `t_index` (`t`),
  KEY `z_index` (`z`),
  KEY `ip_index` (`ip`),
  KEY `spider` (`spider`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='访问日志表'