# Database schema

CREATE DATABASE molangtalk DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE TB_USER (
    ID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    UDID VARCHAR(100) NOT NULL UNIQUE COMMENT '디바이스 유니크 아이디',
    NICK_NAME VARCHAR(12) NOT NULL COMMENT '닉네임',
    GENDER ENUM('M', 'F') NOT NULL COMMENT '성별',
    AGE INT UNSIGNED NOT NULL COMMENT '나이',
    POINT INT UNSIGNED NOT NULL COMMENT '보유 포인트',
    REG_DATE TIMESTAMP NOT NULL COMMENT '가입 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE TB_POINT (
    ID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    POINT_CODE VARCHAR(50) NOT NULL UNIQUE COMMENT '포인트 코드',
    POINT_NAME VARCHAR(30) NOT NULL COMMENT '포인트 이름',
    POINT INT NOT NULL COMMENT '발생 포인트',
    REG_DATE TIMESTAMP NOT NULL COMMENT '등록 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE TB_POINT_HISTORY (
    ID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    USER_ID INT UNSIGNED NOT NULL COMMENT '회원의 PK',
    POINT_CODE VARCHAR(50) NOT NULL COMMENT '포인트 발생 코드',
    POINT INT NOT NULL COMMENT '발생 포인트',
    REG_DATE TIMESTAMP NOT NULL COMMENT '포인트 발생 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
