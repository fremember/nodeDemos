SET SQL_MODE = "NO_AUTO_VALUE_ONZERO"
SET time_zone = "+00:00"

CREATE TABLE IF NOT EXISTS `node_book` (
    `book_id` int(11) NOT NULL AUTO_INCREMENT,
    `book_name` varchar(100) COLLATE utf8_bin NOT NULL,
    `author` varchar(100) COLLATE utf8_bin NOT NULL,
    `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`book_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

-- 插入数据
-- INSERT INTO node_book (`book_name`, `author`) VALUES ('前端开发', 'pxy');