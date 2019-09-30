# Database schema

CREATE DATABASE molangtalk DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE tb_user (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    udid VARCHAR(100) NOT NULL UNIQUE COMMENT '디바이스 유니크 아이디',
    nick_name VARCHAR(12) NOT NULL COMMENT '닉네임',
    gender ENUM('M', 'F') NOT NULL COMMENT '성별',
    age INT UNSIGNED NOT NULL COMMENT '나이',
    point INT UNSIGNED NOT NULL COMMENT '보유 포인트',
    reg_date TIMESTAMP NOT NULL COMMENT '가입 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tb_point (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    point_code VARCHAR(50) NOT NULL UNIQUE COMMENT '포인트 코드',
    point_name VARCHAR(30) NOT NULL COMMENT '포인트 이름',
    point INT NOT NULL COMMENT '발생 포인트',
    reg_date TIMESTAMP NOT NULL COMMENT '등록 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tb_point_history (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    user_id INT UNSIGNED NOT NULL COMMENT '회원의 PK',
    point_code VARCHAR(50) NOT NULL COMMENT '포인트 발생 코드',
    point INT NOT NULL COMMENT '발생 포인트',
    reg_date TIMESTAMP NOT NULL COMMENT '포인트 발생 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO tb_point (point_code, point_name, point, reg_date) VALUES ('JOIN', '회원가입 포인트', 300, sysdate());
INSERT INTO tb_point (point_code, point_name, point, reg_date) VALUES ('ATTENDANCE', '출석체크 포인트', 100, sysdate());