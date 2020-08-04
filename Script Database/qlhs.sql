-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 04, 2020 lúc 04:50 AM
-- Phiên bản máy phục vụ: 10.4.13-MariaDB
-- Phiên bản PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlhs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bomon`
--

CREATE TABLE `bomon` (
  `mabm` varchar(15) COLLATE latin1_bin NOT NULL,
  `tenbm` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `bomon`
--

INSERT INTO `bomon` (`mabm`, `tenbm`) VALUES
('AnhVan', 'Anh văn'),
('CongNghe', 'Công nghệ'),
('DiaLy', 'Địa lý'),
('GDCD', 'Giáo dục công nhân'),
('GDQP', 'Giáo dục quốc phòng'),
('HoaHoc', 'Hóa học'),
('LichSu', 'Lịch sử'),
('NguVan', 'Ngữ văn'),
('SinhHoc', 'Sinh học'),
('TheDuc', 'Thể dục'),
('TinHoc', 'Tin học'),
('Toan', 'Toán'),
('VatLy', 'Vật lý');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cauhoiks`
--

CREATE TABLE `cauhoiks` (
  `macauhoi` varchar(15) COLLATE latin1_bin NOT NULL,
  `noidung` varchar(5000) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diem`
--

CREATE TABLE `diem` (
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
  `malop` varchar(15) COLLATE latin1_bin NOT NULL,
  `mabm` varchar(15) COLLATE latin1_bin NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `cot1` float DEFAULT NULL,
  `cot2` float DEFAULT NULL,
  `cot3` float DEFAULT NULL,
  `cot4` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `diem`
--

INSERT INTO `diem` (`mahs`, `malop`, `mabm`, `mahk`, `nambd`, `namkt`, `cot1`, `cot2`, `cot3`, `cot4`) VALUES
('HS20180101', 'LH201801', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180101', 'LH201801', 'Toan', 2, 2019, 2020, 9, 9, 9, 10),
('HS20180101', 'LH201801', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180102', 'LH201801', 'Toan', 2, 2019, 2020, 9, 9, 9, 9),
('HS20180102', 'LH201801', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180103', 'LH201801', 'Toan', 2, 2019, 2020, 9, 9, 9, 9),
('HS20180103', 'LH201801', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180104', 'LH201801', 'Toan', 2, 2019, 2020, 9, 9, 9, 9),
('HS20180104', 'LH201801', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180105', 'LH201801', 'Toan', 2, 2019, 2020, 9, 9, 9, 10),
('HS20180105', 'LH201801', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'Toan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180201', 'LH201802', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'Toan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180202', 'LH201802', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'Toan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180203', 'LH201802', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'Toan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180204', 'LH201802', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'Toan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20180205', 'LH201802', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'Toan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190101', 'LH201901', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'AnhVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'CongNghe', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'DiaLy', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'GDCD', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'GDQP', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'HoaHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'LichSu', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'NguVan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'SinhHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'TheDuc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'TinHoc', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'Toan', 2, 2019, 2020, 10, 10, 10, 10),
('HS20190102', 'LH201901', 'VatLy', 2, 2019, 2020, 10, 10, 10, 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dotks`
--

CREATE TABLE `dotks` (
  `stt` int(11) NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `ngaybd` date NOT NULL,
  `ngaykt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giaovien`
--

CREATE TABLE `giaovien` (
  `magv` varchar(15) COLLATE latin1_bin NOT NULL,
  `ngaysinh` date DEFAULT NULL,
  `hoten` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `gioitinh` int(11) DEFAULT NULL,
  `diachi` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `sdt` varchar(11) COLLATE latin1_bin DEFAULT NULL,
  `mabm` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `trangthai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `giaovien`
--

INSERT INTO `giaovien` (`magv`, `ngaysinh`, `hoten`, `gioitinh`, `diachi`, `sdt`, `mabm`, `trangthai`) VALUES
('GV01', '1980-06-15', 'Nguyễn Văn Toán', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'Toan', 1),
('GV02', '1980-06-15', 'Nguyễn Văn Ngữ Văn', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'NguVan', 1),
('GV03', '1980-06-15', 'Nguyễn Văn Tiếng Anh', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'AnhVan', 1),
('GV04', '1980-06-15', 'Nguyễn Văn Vật Lý', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'VatLy', 1),
('GV05', '1980-06-15', 'Nguyễn Văn Hóa Học', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'HoaHoc', 1),
('GV06', '1980-06-15', 'Nguyễn Văn Sinh Học', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'SinhHoc', 1),
('GV07', '1980-06-15', 'Nguyễn Văn Lịch Sử', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'LichSu', 1),
('GV08', '1980-06-15', 'Nguyễn Văn Địa Lý', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'DiaLy', 1),
('GV09', '1980-06-15', 'Nguyễn Văn Công Dân', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'GDCD', 1),
('GV10', '1980-06-15', 'Nguyễn Văn Tin Học', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'TinHoc', 1),
('GV11', '1980-06-15', 'Nguyễn Văn Quốc Phòng', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'GDQP', 1),
('GV12', '1980-06-15', 'Nguyễn Văn Thể Chất', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'TheDuc', 1),
('GV13', '1980-06-15', 'Nguyễn Văn Toán Học', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'Toan', 1),
('GV14', '1980-06-15', 'Nguyễn Văn Toán Hình', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'Toan', 1),
('GV15', '1980-06-15', 'Nguyễn Văn Văn', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'NguVan', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hanhkiem`
--

CREATE TABLE `hanhkiem` (
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
  `malop` varchar(15) COLLATE latin1_bin NOT NULL,
  `magv` varchar(15) COLLATE latin1_bin NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `xeploai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `hanhkiem`
--

INSERT INTO `hanhkiem` (`mahs`, `malop`, `magv`, `mahk`, `nambd`, `namkt`, `xeploai`) VALUES
('HS20180101', 'LH201801', 'GV01', 2, 2019, 2020, 2),
('HS20180102', 'LH201801', 'GV01', 2, 2019, 2020, 1),
('HS20180103', 'LH201801', 'GV01', 2, 2019, 2020, 1),
('HS20180104', 'LH201801', 'GV01', 2, 2019, 2020, 1),
('HS20180105', 'LH201801', 'GV01', 2, 2019, 2020, 1),
('HS20180201', 'LH201802', 'GV02', 2, 2019, 2020, 1),
('HS20180202', 'LH201802', 'GV02', 2, 2019, 2020, 1),
('HS20180203', 'LH201802', 'GV02', 2, 2019, 2020, 1),
('HS20180204', 'LH201802', 'GV02', 2, 2019, 2020, 1),
('HS20180205', 'LH201802', 'GV02', 2, 2019, 2020, 1),
('HS20180301', 'LH201803', 'GV03', 2, 2019, 2020, 1),
('HS20180302', 'LH201803', 'GV03', 2, 2019, 2020, 1),
('HS20180303', 'LH201803', 'GV03', 2, 2019, 2020, 1),
('HS20180304', 'LH201803', 'GV03', 2, 2019, 2020, 1),
('HS20180305', 'LH201803', 'GV03', 2, 2019, 2020, 1),
('HS20180401', 'LH201804', 'GV04', 2, 2019, 2020, 1),
('HS20180402', 'LH201804', 'GV04', 2, 2019, 2020, 1),
('HS20180403', 'LH201804', 'GV04', 2, 2019, 2020, 1),
('HS20180404', 'LH201804', 'GV04', 2, 2019, 2020, 1),
('HS20180405', 'LH201804', 'GV04', 2, 2019, 2020, 1),
('HS20190101', 'LH201901', 'GV05', 2, 2019, 2020, 1),
('HS20190102', 'LH201901', 'GV05', 2, 2019, 2020, 1),
('HS20190103', 'LH201901', 'GV05', 2, 2019, 2020, 1),
('HS20190104', 'LH201901', 'GV05', 2, 2019, 2020, 1),
('HS20190105', 'LH201901', 'GV05', 2, 2019, 2020, 1),
('HS20190201', 'LH201902', 'GV06', 2, 2019, 2020, 1),
('HS20190202', 'LH201902', 'GV06', 2, 2019, 2020, 1),
('HS20190203', 'LH201902', 'GV06', 2, 2019, 2020, 1),
('HS20190204', 'LH201902', 'GV06', 2, 2019, 2020, 1),
('HS20190205', 'LH201902', 'GV06', 2, 2019, 2020, 1),
('HS20190301', 'LH201903', 'GV07', 2, 2019, 2020, 1),
('HS20190302', 'LH201903', 'GV07', 2, 2019, 2020, 1),
('HS20190303', 'LH201903', 'GV07', 2, 2019, 2020, 1),
('HS20190304', 'LH201903', 'GV07', 2, 2019, 2020, 1),
('HS20190305', 'LH201903', 'GV07', 2, 2019, 2020, 1),
('HS20190401', 'LH201904', 'GV08', 2, 2019, 2020, 1),
('HS20190402', 'LH201904', 'GV08', 2, 2019, 2020, 1),
('HS20190403', 'LH201904', 'GV08', 2, 2019, 2020, 1),
('HS20190404', 'LH201904', 'GV08', 2, 2019, 2020, 1),
('HS20190405', 'LH201904', 'GV08', 2, 2019, 2020, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hocky`
--

CREATE TABLE `hocky` (
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `trangthai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `hocky`
--

INSERT INTO `hocky` (`mahk`, `nambd`, `namkt`, `trangthai`) VALUES
(1, 2018, 2019, 0),
(1, 2019, 2020, 0),
(2, 2018, 2019, 0),
(2, 2019, 2020, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hocsinh`
--

CREATE TABLE `hocsinh` (
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
  `ngaysinh` date DEFAULT NULL,
  `hoten` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `gioitinh` int(11) DEFAULT NULL,
  `diachi` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `malop` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `trangthai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `hocsinh`
--

INSERT INTO `hocsinh` (`mahs`, `ngaysinh`, `hoten`, `gioitinh`, `diachi`, `malop`, `trangthai`) VALUES
('HS20180101', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180102', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180103', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180104', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180105', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180201', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180202', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180203', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180204', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180205', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180301', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201803', 1),
('HS20180302', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201803', 1),
('HS20180303', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201803', 1),
('HS20180304', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201803', 1),
('HS20180305', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201803', 1),
('HS20180401', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201804', 1),
('HS20180402', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201804', 1),
('HS20180403', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201804', 1),
('HS20180404', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201804', 1),
('HS20180405', '2001-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201804', 1),
('HS20190101', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201901', 1),
('HS20190102', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201901', 1),
('HS20190103', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201901', 1),
('HS20190104', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201901', 1),
('HS20190105', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201901', 1),
('HS20190201', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201902', 1),
('HS20190202', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201902', 1),
('HS20190203', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201902', 1),
('HS20190204', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201902', 1),
('HS20190205', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201902', 1),
('HS20190301', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201903', 1),
('HS20190302', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201903', 1),
('HS20190303', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201903', 1),
('HS20190304', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201903', 1),
('HS20190305', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201903', 1),
('HS20190401', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201904', 1),
('HS20190402', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201904', 1),
('HS20190403', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201904', 1),
('HS20190404', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201904', 1),
('HS20190405', '2002-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201904', 1),
('HS20200101', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202001', 1),
('HS20200102', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202001', 1),
('HS20200103', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202001', 1),
('HS20200104', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202001', 1),
('HS20200105', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202001', 1),
('HS20200201', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202002', 1),
('HS20200202', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202002', 1),
('HS20200203', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202002', 1),
('HS20200204', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202002', 1),
('HS20200205', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202002', 1),
('HS20200301', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202003', 1),
('HS20200302', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202003', 1),
('HS20200303', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202003', 1),
('HS20200304', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202003', 1),
('HS20200305', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202003', 1),
('HS20200401', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202004', 1),
('HS20200402', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202004', 1),
('HS20200403', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202004', 1),
('HS20200404', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202004', 1),
('HS20200405', '2003-10-10', 'Nguyễn Văn A', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH202004', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kqkhaosat`
--

CREATE TABLE `kqkhaosat` (
  `macauhoi` varchar(15) COLLATE latin1_bin NOT NULL,
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
  `magv` varchar(15) COLLATE latin1_bin NOT NULL,
  `mabm` varchar(15) COLLATE latin1_bin NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `cautl` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichthi`
--

CREATE TABLE `lichthi` (
  `malt` varchar(50) COLLATE latin1_bin NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `maphong` varchar(15) COLLATE latin1_bin NOT NULL,
  `mabm` varchar(15) COLLATE latin1_bin NOT NULL,
  `ngaythi` date NOT NULL,
  `tietBD` int(11) NOT NULL,
  `khoi` int(11) NOT NULL,
  `giamthi1` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `giamthi2` varchar(15) COLLATE latin1_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `lichthi`
--

INSERT INTO `lichthi` (`malt`, `mahk`, `nambd`, `namkt`, `maphong`, `mabm`, `ngaythi`, `tietBD`, `khoi`, `giamthi1`, `giamthi2`) VALUES
('640b879f-6cb9-4c65-b372-69208b63eba2', 2, 2019, 2020, '01', 'Toan', '2020-03-09', 1, 11, 'GV01', 'GV02'),
('a78abe8e-9426-459b-b92a-79e66ca2f761', 2, 2019, 2020, '01', 'Toan', '2020-03-09', 1, 10, 'GV01', 'GV02'),
('aajafafjkafafn', 1, 2019, 2020, '10', 'LichSu', '2020-08-02', 2, 10, 'GV09', 'GV14'),
('abcdefgh', 2, 2019, 2020, '01', 'NguVan', '2021-09-03', 3, 10, 'GV01', 'GV02'),
('akakakaka', 2, 2019, 2020, '09', 'Toan', '2020-08-04', 10, 12, 'GV11', 'GV06'),
('d6ad249f-3b79-42ac-9757-0718189305fd', 2, 2019, 2020, '02', 'Toan', '2020-03-09', 1, 11, 'GV04', 'GV05'),
('oiuytr', 2, 2019, 2020, '08', 'GDCD', '2020-08-03', 2, 11, 'GV08', 'GV13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loainv`
--

CREATE TABLE `loainv` (
  `maloai` varchar(15) COLLATE latin1_bin NOT NULL,
  `tenloai` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `loainv`
--

INSERT INTO `loainv` (`maloai`, `tenloai`) VALUES
('GiaoVu', 'Giáo vụ'),
('admin', 'Quản trị viên hệ thống');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lophoc`
--

CREATE TABLE `lophoc` (
  `malop` varchar(15) COLLATE latin1_bin NOT NULL,
  `magvcn` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `maphong` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `namnhaphoc` int(11) DEFAULT NULL,
  `trangthai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `lophoc`
--

INSERT INTO `lophoc` (`malop`, `magvcn`, `maphong`, `namnhaphoc`, `trangthai`) VALUES
('LH201801', 'GV01', '01', 2018, 1),
('LH201802', 'GV02', '02', 2018, 1),
('LH201803', 'GV03', '03', 2018, 1),
('LH201804', 'GV04', '04', 2018, 1),
('LH201901', 'GV05', '05', 2019, 1),
('LH201902', 'GV06', '06', 2019, 1),
('LH201903', 'GV07', '07', 2019, 1),
('LH201904', 'GV08', '08', 2019, 1),
('LH202001', 'GV09', '09', 2020, 1),
('LH202002', 'GV10', '10', 2020, 1),
('LH202003', 'GV11', '11', 2020, 1),
('LH202004', 'GV12', '12', 2020, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `tenDangNhap` varchar(15) COLLATE latin1_bin NOT NULL,
  `matKhau` varchar(100) COLLATE latin1_bin NOT NULL,
  `cmnd` varchar(20) COLLATE latin1_bin DEFAULT NULL,
  `loai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`tenDangNhap`, `matKhau`, `cmnd`, `loai`) VALUES
('GV01', 'GV01', '215487789', 3),
('GV02', 'GV02', '215487789', 3),
('GV03', 'GV03', '215487789', 3),
('GV04', 'GV04', '215487789', 3),
('GV05', 'GV05', '215487789', 3),
('GV06', 'GV06', '215487789', 3),
('GV07', 'GV07', '215487789', 3),
('GV08', 'GV08', '215487789', 3),
('GV09', 'GV09', '215487789', 3),
('GV10', 'GV10', '215487789', 3),
('GV11', 'GV11', '215487789', 3),
('GV12', 'GV12', '215487789', 3),
('GV13', 'GV13', '215487789', 2),
('GV14', 'GV14', '215487789', 2),
('GV15', 'GV15', '215487789', 2),
('GV16', '1234', '12345', 2),
('HS20180101', 'HS20180101', '215487789', 1),
('HS20180102', 'HS20180102', '215487789', 1),
('HS20180103', 'HS20180103', '215487789', 1),
('HS20180104', 'HS20180104', '215487789', 1),
('HS20180105', 'HS20180105', '215487789', 1),
('HS20180201', 'HS20180201', '215487789', 1),
('HS20180202', 'HS20180202', '215487789', 1),
('HS20180203', 'HS20180203', '215487789', 1),
('HS20180204', 'HS20180204', '215487789', 1),
('HS20180205', 'HS20180205', '215487789', 1),
('HS20180301', 'HS20180301', '215487789', 1),
('HS20180302', 'HS20180302', '215487789', 1),
('HS20180303', 'HS20180303', '215487789', 1),
('HS20180304', 'HS20180304', '215487789', 1),
('HS20180305', 'HS20180305', '215487789', 1),
('HS20180401', 'HS20180401', '215487789', 1),
('HS20180402', 'HS20180402', '215487789', 1),
('HS20180403', 'HS20180403', '215487789', 1),
('HS20180404', 'HS20180404', '215487789', 1),
('HS20180405', 'HS20180405', '215487789', 1),
('HS20190101', 'HS20190101', '215487789', 1),
('HS20190102', 'HS20190102', '215487789', 1),
('HS20190103', 'HS20190103', '215487789', 1),
('HS20190104', 'HS20190104', '215487789', 1),
('HS20190105', 'HS20190105', '215487789', 1),
('HS20190201', 'HS20190201', '215487789', 1),
('HS20190202', 'HS20190202', '215487789', 1),
('HS20190203', 'HS20190203', '215487789', 1),
('HS20190204', 'HS20190204', '215487789', 1),
('HS20190205', 'HS20190205', '215487789', 1),
('HS20190301', 'HS20190301', '215487789', 1),
('HS20190302', 'HS20190302', '215487789', 1),
('HS20190303', 'HS20190303', '215487789', 1),
('HS20190304', 'HS20190304', '215487789', 1),
('HS20190305', 'HS20190305', '215487789', 1),
('HS20190401', 'HS20190401', '215487789', 1),
('HS20190402', 'HS20190402', '215487789', 1),
('HS20190403', 'HS20190403', '215487789', 1),
('HS20190404', 'HS20190404', '215487789', 1),
('HS20190405', 'HS20190405', '215487789', 1),
('HS20200101', 'HS20200101', '215487789', 1),
('HS20200102', 'HS20200102', '215487789', 1),
('HS20200103', 'HS20200103', '215487789', 1),
('HS20200104', 'HS20200104', '215487789', 1),
('HS20200105', 'HS20200105', '215487789', 1),
('HS20200201', 'HS20200201', '215487789', 1),
('HS20200202', 'HS20200202', '215487789', 1),
('HS20200203', 'HS20200203', '215487789', 1),
('HS20200204', 'HS20200204', '215487789', 1),
('HS20200205', 'HS20200205', '215487789', 1),
('HS20200301', 'HS20200301', '215487789', 1),
('HS20200302', 'HS20200302', '215487789', 1),
('HS20200303', 'HS20200303', '215487789', 1),
('HS20200304', 'HS20200304', '215487789', 1),
('HS20200305', 'HS20200305', '215487789', 1),
('HS20200401', 'HS20200401', '215487789', 1),
('HS20200402', 'HS20200402', '215487789', 1),
('HS20200403', 'HS20200403', '215487789', 1),
('HS20200404', 'HS20200404', '215487789', 1),
('HS20200405', 'HS20200405', '215487789', 1),
('NV01', 'NV01', '215487789', 4),
('NV02', 'NV02', '215487789', 4),
('admin', 'admin', '215487789', 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoithan`
--

CREATE TABLE `nguoithan` (
  `stt` int(11) NOT NULL,
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
  `quanhe` varchar(30) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `hoten` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `sdt` varchar(11) COLLATE latin1_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `manv` varchar(15) COLLATE latin1_bin NOT NULL,
  `hoten` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `gioitinh` int(11) DEFAULT NULL,
  `diachi` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `sdt` varchar(11) COLLATE latin1_bin DEFAULT NULL,
  `trangthai` int(11) DEFAULT NULL,
  `maloainv` varchar(15) COLLATE latin1_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`manv`, `hoten`, `ngaysinh`, `gioitinh`, `diachi`, `sdt`, `trangthai`, `maloainv`) VALUES
('NV01', 'Nguyễn Văn V', '1960-01-01', 1, '2 Bà Trưng, Hà Nội', '123456789', 1, 'GiaoVu'),
('NV02', 'Nguyễn Văn V1', '1960-01-01', 1, 'Cầu Giấy, Hà Nội', '123456789', 1, 'GiaoVu'),
('admin', 'Admin', '2020-01-01', 1, 'admin', '0', 1, 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phonghoc`
--

CREATE TABLE `phonghoc` (
  `maphong` varchar(15) COLLATE latin1_bin NOT NULL,
  `tenphong` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `loaiphong` varchar(15) COLLATE latin1_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `phonghoc`
--

INSERT INTO `phonghoc` (`maphong`, `tenphong`, `loaiphong`) VALUES
('01', 'A01', 'Thuong'),
('02', 'A02', 'Thuong'),
('03', 'A03', 'Thuong'),
('04', 'A04', 'Thuong'),
('05', 'B01', 'Thuong'),
('06', 'B02', 'Thuong'),
('07', 'B03', 'Thuong'),
('08', 'B04', 'Thuong'),
('09', 'B05', 'Thuong'),
('10', 'B06', 'Thuong'),
('11', 'C01', 'Thuong'),
('12', 'C02', 'Thuong');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongthi`
--

CREATE TABLE `phongthi` (
  `maphongthi` varchar(15) COLLATE latin1_bin NOT NULL,
  `phonghoc` varchar(15) COLLATE latin1_bin NOT NULL,
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `phongthi`
--

INSERT INTO `phongthi` (`maphongthi`, `phonghoc`, `mahs`, `mahk`, `nambd`, `namkt`) VALUES
('2', '02', 'HS20180103', 1, 2019, 2020);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phuckhao`
--

CREATE TABLE `phuckhao` (
  `mapk` varchar(36) COLLATE latin1_bin NOT NULL,
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
  `magv` varchar(15) COLLATE latin1_bin NOT NULL,
  `mabm` varchar(15) COLLATE latin1_bin NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `noidung` varchar(5000) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `phanhoi` varchar(5000) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `trangthai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thoikhoabieu`
--

CREATE TABLE `thoikhoabieu` (
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `magv` varchar(15) COLLATE latin1_bin NOT NULL,
  `mabm` varchar(15) COLLATE latin1_bin NOT NULL,
  `malop` varchar(15) COLLATE latin1_bin NOT NULL,
  `ngaytrongtuan` int(11) NOT NULL,
  `tiet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `thoikhoabieu`
--

INSERT INTO `thoikhoabieu` (`mahk`, `nambd`, `namkt`, `magv`, `mabm`, `malop`, `ngaytrongtuan`, `tiet`) VALUES
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 1, 1),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 1, 2),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 2, 1),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 2, 2),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 3, 1),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 3, 2),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 4, 1),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 4, 2),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 5, 1),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 5, 2),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 6, 1),
(2, 2019, 2020, 'GV01', 'Toan', 'LH201801', 6, 2);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bomon`
--
ALTER TABLE `bomon`
  ADD PRIMARY KEY (`mabm`);

--
-- Chỉ mục cho bảng `cauhoiks`
--
ALTER TABLE `cauhoiks`
  ADD PRIMARY KEY (`macauhoi`);

--
-- Chỉ mục cho bảng `diem`
--
ALTER TABLE `diem`
  ADD PRIMARY KEY (`mahs`,`malop`,`mabm`,`mahk`,`nambd`,`namkt`),
  ADD KEY `FK_DIEM_LOPHOC` (`malop`),
  ADD KEY `FK_DIEM_BOMON` (`mabm`),
  ADD KEY `FK_DIEM_HOCKY` (`mahk`,`nambd`,`namkt`);

--
-- Chỉ mục cho bảng `dotks`
--
ALTER TABLE `dotks`
  ADD PRIMARY KEY (`stt`),
  ADD KEY `FK_DOTKS_HOCKY` (`mahk`,`nambd`,`namkt`);

--
-- Chỉ mục cho bảng `giaovien`
--
ALTER TABLE `giaovien`
  ADD PRIMARY KEY (`magv`),
  ADD KEY `FK_GIAOVIEN_BOMON` (`mabm`);

--
-- Chỉ mục cho bảng `hanhkiem`
--
ALTER TABLE `hanhkiem`
  ADD PRIMARY KEY (`mahs`,`malop`,`magv`,`mahk`,`nambd`,`namkt`),
  ADD KEY `FK_HANHKIEM_LOPHOC` (`malop`),
  ADD KEY `FK_HANHKIEM_GIAOVIEN` (`magv`),
  ADD KEY `FK_HANHKIEM_HOCKY` (`mahk`,`nambd`,`namkt`);

--
-- Chỉ mục cho bảng `hocky`
--
ALTER TABLE `hocky`
  ADD PRIMARY KEY (`mahk`,`nambd`,`namkt`);

--
-- Chỉ mục cho bảng `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD PRIMARY KEY (`mahs`),
  ADD KEY `FK_HOCSINH_LOPHOC` (`malop`);

--
-- Chỉ mục cho bảng `kqkhaosat`
--
ALTER TABLE `kqkhaosat`
  ADD PRIMARY KEY (`macauhoi`,`mahs`,`magv`,`mabm`,`mahk`,`nambd`,`namkt`),
  ADD KEY `FK_KQKHAOSAT_GIAOVIEN` (`magv`),
  ADD KEY `FK_KQKHAOSAT_BOMON` (`mabm`),
  ADD KEY `FK_KQKHAOSAT_HOCKY` (`mahk`,`nambd`,`namkt`);

--
-- Chỉ mục cho bảng `lichthi`
--
ALTER TABLE `lichthi`
  ADD PRIMARY KEY (`malt`),
  ADD KEY `FK_LICHTHI_PHONGHOC` (`maphong`),
  ADD KEY `FK_LICHTHI_BOMON` (`mabm`),
  ADD KEY `FK_LICHTHI_GIAOVIEN1` (`giamthi1`),
  ADD KEY `FK_LICHTHI_GIAOVIEN2` (`giamthi2`),
  ADD KEY `FK_LICHTHI_HOCKY` (`mahk`,`nambd`,`namkt`);

--
-- Chỉ mục cho bảng `loainv`
--
ALTER TABLE `loainv`
  ADD PRIMARY KEY (`maloai`);

--
-- Chỉ mục cho bảng `lophoc`
--
ALTER TABLE `lophoc`
  ADD PRIMARY KEY (`malop`),
  ADD KEY `FK_LOPHOC_GIAOVIEN` (`magvcn`),
  ADD KEY `FK_LOPHOC_PHONGHOC` (`maphong`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`tenDangNhap`);

--
-- Chỉ mục cho bảng `nguoithan`
--
ALTER TABLE `nguoithan`
  ADD PRIMARY KEY (`stt`),
  ADD KEY `FK_NGUOITHAN_HOCSINH` (`mahs`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`manv`),
  ADD KEY `FK_NHANVIEN_LOAINV` (`maloainv`);

--
-- Chỉ mục cho bảng `phonghoc`
--
ALTER TABLE `phonghoc`
  ADD PRIMARY KEY (`maphong`);

--
-- Chỉ mục cho bảng `phongthi`
--
ALTER TABLE `phongthi`
  ADD PRIMARY KEY (`maphongthi`,`phonghoc`,`mahs`,`mahk`,`nambd`,`namkt`),
  ADD KEY `FK_PHONGTHI_PHONGHOC` (`phonghoc`),
  ADD KEY `FK_PHONGTHI_HOCSINH` (`mahs`),
  ADD KEY `FK_PHONGTHI_HOCKY` (`mahk`,`nambd`,`namkt`);

--
-- Chỉ mục cho bảng `phuckhao`
--
ALTER TABLE `phuckhao`
  ADD PRIMARY KEY (`mapk`),
  ADD KEY `FK_PHUCKHAO_GIAOVIEN` (`magv`),
  ADD KEY `FK_PHUCKHAO_BOMON` (`mabm`),
  ADD KEY `FK_PHUCKHAO_HOCKY` (`mahk`,`nambd`,`namkt`),
  ADD KEY `FK_PHUCKHAO_HOCSINH` (`mahs`);

--
-- Chỉ mục cho bảng `thoikhoabieu`
--
ALTER TABLE `thoikhoabieu`
  ADD PRIMARY KEY (`mahk`,`nambd`,`namkt`,`magv`,`mabm`,`malop`,`ngaytrongtuan`,`tiet`),
  ADD KEY `FK_THOIKHOABIEU_GIAOVIEN` (`magv`),
  ADD KEY `FK_THOIKHOABIEU_BOMON` (`mabm`),
  ADD KEY `FK_THOIKHOABIEU_LOPHOC` (`malop`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `dotks`
--
ALTER TABLE `dotks`
  MODIFY `stt` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nguoithan`
--
ALTER TABLE `nguoithan`
  MODIFY `stt` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `diem`
--
ALTER TABLE `diem`
  ADD CONSTRAINT `FK_DIEM_BOMON` FOREIGN KEY (`mabm`) REFERENCES `bomon` (`mabm`),
  ADD CONSTRAINT `FK_DIEM_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`),
  ADD CONSTRAINT `FK_DIEM_HOCSINH` FOREIGN KEY (`mahs`) REFERENCES `hocsinh` (`mahs`),
  ADD CONSTRAINT `FK_DIEM_LOPHOC` FOREIGN KEY (`malop`) REFERENCES `lophoc` (`malop`);

--
-- Các ràng buộc cho bảng `dotks`
--
ALTER TABLE `dotks`
  ADD CONSTRAINT `FK_DOTKS_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`);

--
-- Các ràng buộc cho bảng `giaovien`
--
ALTER TABLE `giaovien`
  ADD CONSTRAINT `FK_GIAOVIEN_BOMON` FOREIGN KEY (`mabm`) REFERENCES `bomon` (`mabm`),
  ADD CONSTRAINT `FK_GIAOVIEN_NGUOIDUNG` FOREIGN KEY (`magv`) REFERENCES `nguoidung` (`tenDangNhap`);

--
-- Các ràng buộc cho bảng `hanhkiem`
--
ALTER TABLE `hanhkiem`
  ADD CONSTRAINT `FK_HANHKIEM_GIAOVIEN` FOREIGN KEY (`magv`) REFERENCES `giaovien` (`magv`),
  ADD CONSTRAINT `FK_HANHKIEM_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`),
  ADD CONSTRAINT `FK_HANHKIEM_HOCSINH` FOREIGN KEY (`mahs`) REFERENCES `hocsinh` (`mahs`),
  ADD CONSTRAINT `FK_HANHKIEM_LOPHOC` FOREIGN KEY (`malop`) REFERENCES `lophoc` (`malop`);

--
-- Các ràng buộc cho bảng `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD CONSTRAINT `FK_HOCSINH_LOPHOC` FOREIGN KEY (`malop`) REFERENCES `lophoc` (`malop`),
  ADD CONSTRAINT `FK_HOCSINH_NGUOIDUNG` FOREIGN KEY (`mahs`) REFERENCES `nguoidung` (`tenDangNhap`);

--
-- Các ràng buộc cho bảng `kqkhaosat`
--
ALTER TABLE `kqkhaosat`
  ADD CONSTRAINT `FK_KQKHAOSAT_BOMON` FOREIGN KEY (`mabm`) REFERENCES `bomon` (`mabm`),
  ADD CONSTRAINT `FK_KQKHAOSAT_CAUHOIKS` FOREIGN KEY (`macauhoi`) REFERENCES `cauhoiks` (`macauhoi`),
  ADD CONSTRAINT `FK_KQKHAOSAT_GIAOVIEN` FOREIGN KEY (`magv`) REFERENCES `giaovien` (`magv`),
  ADD CONSTRAINT `FK_KQKHAOSAT_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`);

--
-- Các ràng buộc cho bảng `lichthi`
--
ALTER TABLE `lichthi`
  ADD CONSTRAINT `FK_LICHTHI_BOMON` FOREIGN KEY (`mabm`) REFERENCES `bomon` (`mabm`),
  ADD CONSTRAINT `FK_LICHTHI_GIAOVIEN1` FOREIGN KEY (`giamthi1`) REFERENCES `giaovien` (`magv`),
  ADD CONSTRAINT `FK_LICHTHI_GIAOVIEN2` FOREIGN KEY (`giamthi2`) REFERENCES `giaovien` (`magv`),
  ADD CONSTRAINT `FK_LICHTHI_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`),
  ADD CONSTRAINT `FK_LICHTHI_PHONGHOC` FOREIGN KEY (`maphong`) REFERENCES `phonghoc` (`maphong`);

--
-- Các ràng buộc cho bảng `lophoc`
--
ALTER TABLE `lophoc`
  ADD CONSTRAINT `FK_LOPHOC_GIAOVIEN` FOREIGN KEY (`magvcn`) REFERENCES `giaovien` (`magv`),
  ADD CONSTRAINT `FK_LOPHOC_PHONGHOC` FOREIGN KEY (`maphong`) REFERENCES `phonghoc` (`maphong`);

--
-- Các ràng buộc cho bảng `nguoithan`
--
ALTER TABLE `nguoithan`
  ADD CONSTRAINT `FK_NGUOITHAN_HOCSINH` FOREIGN KEY (`mahs`) REFERENCES `hocsinh` (`mahs`);

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `FK_NHANVIEN_LOAINV` FOREIGN KEY (`maloainv`) REFERENCES `loainv` (`maloai`),
  ADD CONSTRAINT `FK_NHANVIEN_NGUOIDUNG` FOREIGN KEY (`manv`) REFERENCES `nguoidung` (`tenDangNhap`);

--
-- Các ràng buộc cho bảng `phongthi`
--
ALTER TABLE `phongthi`
  ADD CONSTRAINT `FK_PHONGTHI_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`),
  ADD CONSTRAINT `FK_PHONGTHI_HOCSINH` FOREIGN KEY (`mahs`) REFERENCES `hocsinh` (`mahs`),
  ADD CONSTRAINT `FK_PHONGTHI_PHONGHOC` FOREIGN KEY (`phonghoc`) REFERENCES `phonghoc` (`maphong`);

--
-- Các ràng buộc cho bảng `phuckhao`
--
ALTER TABLE `phuckhao`
  ADD CONSTRAINT `FK_PHUCKHAO_BOMON` FOREIGN KEY (`mabm`) REFERENCES `bomon` (`mabm`),
  ADD CONSTRAINT `FK_PHUCKHAO_GIAOVIEN` FOREIGN KEY (`magv`) REFERENCES `giaovien` (`magv`),
  ADD CONSTRAINT `FK_PHUCKHAO_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`),
  ADD CONSTRAINT `FK_PHUCKHAO_HOCSINH` FOREIGN KEY (`mahs`) REFERENCES `hocsinh` (`mahs`);

--
-- Các ràng buộc cho bảng `thoikhoabieu`
--
ALTER TABLE `thoikhoabieu`
  ADD CONSTRAINT `FK_THOIKHOABIEU_BOMON` FOREIGN KEY (`mabm`) REFERENCES `bomon` (`mabm`),
  ADD CONSTRAINT `FK_THOIKHOABIEU_GIAOVIEN` FOREIGN KEY (`magv`) REFERENCES `giaovien` (`magv`),
  ADD CONSTRAINT `FK_THOIKHOABIEU_HOCKY` FOREIGN KEY (`mahk`,`nambd`,`namkt`) REFERENCES `hocky` (`mahk`, `nambd`, `namkt`),
  ADD CONSTRAINT `FK_THOIKHOABIEU_LOPHOC` FOREIGN KEY (`malop`) REFERENCES `lophoc` (`malop`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
