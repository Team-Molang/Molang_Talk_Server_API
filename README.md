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

CREATE TABLE tb_attendance (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    user_id INT UNSIGNED NOT NULL COMMENT '회원의 PK',
    attendance_year CHAR(2) NOT NULL COMMENT '출석 년도 YY',
    attendance_month CHAR(2) NOT NULL COMMENT '출석 월 MM',
    attendance_day CHAR(2) NOT NULL COMMENT '출석 일 DD',
    reg_date TIMESTAMP NOT NULL COMMENT '출석 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE UNIQUE INDEX idx_attendance_unique ON tb_attendance (user_id, attendance_year, attendance_month, attendance_day);

CREATE TABLE tb_file (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    originalname VARCHAR(200) NOT NULL COMMENT '원본 파일명',
    mimetype VARCHAR(40) NULL COMMENT '마임타입',
    size INT UNSIGNED NOT NULL COMMENT '파일 사이즈',
    location VARCHAR(200) NOT NULL COMMENT '파일 위치',
    reg_date TIMESTAMP NOT NULL COMMENT '파일 업로드 날짜'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO tb_point (point_code, point_name, point, reg_date) VALUES ('JOIN', '회원가입 포인트', 300, sysdate());
INSERT INTO tb_point (point_code, point_name, point, reg_date) VALUES ('ATTENDANCE', '출석체크 포인트', 100, sysdate());