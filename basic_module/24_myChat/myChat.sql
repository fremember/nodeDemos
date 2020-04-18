CREATE TABLE IF NOT EXISTS `user` (
    `uid` int NOT NULL AUTO_INCREMENT,
    `uname` varchar(100),
    `nickanme` varchar(100) NOT NULL DEFAULT '',
    `sex` tinyint NOT NULL DEFAULT 1,
    `email` varchar(100),
    `password` varchar(100) NOT NULL,
    `position` varchar(100),
    `university` varchar(20),
    `hometown` varchar(100),
    `highschool` varchar(20),
    `avatar` varchar(100) NOT NULL,
    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `login_status` tinyint NOT NULL DEFAULT 0,
    `status` tinyint NOT NULL DEFAULT 0,
    PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;