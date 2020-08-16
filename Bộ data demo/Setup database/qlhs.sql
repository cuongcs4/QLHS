-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 16, 2020 lúc 04:20 AM
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
  `macauhoi` int(11) NOT NULL,
  `noidung` varchar(5000) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Đang đổ dữ liệu cho bảng `cauhoiks`
--

INSERT INTO `cauhoiks` (`macauhoi`, `noidung`) VALUES
(1, 'Bạn có hài lòng với thái độ giảng dạy của giáo viên'),
(2, 'Bạn có hài lòng với số lượng môn học và tiết học?'),
(3, 'Bạn có hài lòng với cơ sở vật chất của nhà trường?'),
(4, 'Bạn có hài lòng với mức học phí của nhà trường?'),
(5, 'Bạn có hài lòng với chất lượng đầu ra của bạn?'),
(6, 'Bạn có hài lòng với thời gian bố trí học tập của nhà trường?'),
(7, 'Bạn có hài lòng với trình độ chuyên môn của các giáo viên?'),
(8, 'Bạn có hài lòng với chất lượng các cuộc thi do nhà trường tổ chức?'),
(9, 'Bạn có hài lòng với chất lượng đề thi của nhà trường?'),
(10, 'Bạn có hài lòng với mức độ quan tâm của nhà trường dành cho bạn?');

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
('GV01', '2020-08-15', 'Nguyễn Văn Toán', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'Toan', 1),
('GV02', '1921-02-09', 'Nguyễn Văn Văn', 1, '01 Trần Hưng Đạo, Quận 1, TP.HCM', '0987654321', 'NguVan', 1),
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
(2, 2018, 2019, 0);

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
('HS20180101', '2001-10-10', 'Nguyễn Văn An', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180102', '2001-10-10', 'Nguyễn Văn Bảo', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180103', '2001-10-10', 'Nguyễn Văn Bách', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180104', '2001-10-10', 'Nguyễn Văn Dũng', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180105', '2001-10-10', 'Nguyễn Văn Hưng', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201801', 1),
('HS20180201', '2001-10-10', 'Nguyễn Văn Anh', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180202', '2001-10-10', 'Nguyễn Văn Chính', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180203', '2001-10-10', 'Nguyễn Văn Châu', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180204', '2001-10-10', 'Nguyễn Văn Minh', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
('HS20180205', '2001-10-10', 'Nguyễn Văn Yên', 1, '01 Trần Hưng Đạo, Q1, TP.HCM', 'LH201802', 1),
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
  `macauhoi` int(11) NOT NULL,
  `mahs` varchar(15) COLLATE latin1_bin NOT NULL,
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
('aajafafjkafafn', 1, 2019, 2020, '10', 'LichSu', '2020-08-02', 2, 10, 'GV09', 'GV14');

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
('GV01', '$2b$10$JPTpef8H7vCg1MIH/PX/j.4OoR062EXzkM6POvbQv9ZycXn3/469a', '215487789', 3),
('GV02', '$2b$10$w9I9rdBDvrsukAKHNNs/UOXTCChfpH9Jg3.QjlbKo6d/eO0hB8dv.', '215487789', 3),
('GV03', '$2b$10$uY5u3spxkUhktmHbEoGHGOtkKqJ.mSsT.nRtBAe27Pd6jfnkNTdkm', '215487789', 3),
('GV04', '$2b$10$tXrhcVKQZRwybnHutJwis.mgH9B75/SHv3kLvbBLr/ZlNu/VJE/lO', '215487789', 3),
('GV05', '$2b$10$BcL8djc3q4GxyT7QzHS.WebnJnkpbtVhm38MrQ5VA2Ygn8eNMm3De', '215487789', 3),
('GV06', '$2b$10$kQhN0fpu3a6Sp.jrngu7cOQ2Nsz4k/SFME/A7hq3UfXwYOjGpMXiK', '215487789', 3),
('GV07', '$2b$10$UoWRR988SAEvCpCVmhxdPuTt7nDdhP8Mx3Nr0vDgXczYvhS.YGDGe', '215487789', 3),
('GV08', '$2b$10$8jAx4QXDAvqRsU1ddzk.UujjEoillNf6dvvezV9f1nZq9bIeqJd4C', '215487789', 3),
('GV09', '$2b$10$R6YMxXZltxENReCFZUp7XOSC38OcaFWYpfR17utmjjvf/75ej/q26', '215487789', 3),
('GV10', '$2b$10$aKRJ1AZHMIkKWHphl5fu/.hGFbFkjukNTcU9QsyCPdNzO2O2MTfKa', '215487789', 3),
('GV11', '$2b$10$CfvvLEaBP9K8eyOz9eSZnezn/Nl5QKHAFiSsEO/yxeaHA2fMSqRy.', '215487789', 3),
('GV12', '$2b$10$Xa6PHSgsaQlWT6xdZBjy7ubqbfSI85hza0/qqIanJ4J34U9jfguj6', '215487789', 3),
('GV13', '$2b$10$u0xElBYN.miqFWxhvI9AeO8YHiESVEO5C2d5LcLwws5EHQsXVrcga', '215487789', 2),
('GV14', '$2b$10$/PI4mgqZjf.PeVnoqBD0JeoCT4mow6/0vMiSAx.4oh9kQgC0qbWKm', '215487789', 2),
('GV15', '$2b$10$EFCUGiVLOuT7scIcJ5Tiy.OtWHfykunzUH2doXvawHo4E3ACVBVOC', '215487789', 2),
('GV16', '$2b$10$BjAQQmIvmq3YQRR5LK/1ku4koA9e2d6L.3uNdr5dQN0b7Mygo1l52', '12345', 2),
('HS20180101', '$2b$10$IdfTYGDqzq7BI0vHwZfpFejBLJKgC.ctm1GcZhiCURPqy7jHrZXF.', '215487789', 1),
('HS20180102', '$2b$10$LpFntyDXpJT.3595AeL/MeV.J37fyy5xrJMPF169hj/PSRBOzypOC', '215487789', 1),
('HS20180103', '$2b$10$7HtAwJxso.YPz7mYt.vPkut7EdqdKF4g.H4SWD/c6eP.PAe2SON.y', '215487789', 1),
('HS20180104', '$2b$10$rzeUFSfwFj3C8sR.Lzh2I.baS95d6y9IqVU.n7q7xe5Oh4WkN8tuK', '215487789', 1),
('HS20180105', '$2b$10$iPn1LcKFdE6vDfQIjjkbeOAF3pil4xlQM04WNJVYX78gqkUNAwla6', '215487789', 1),
('HS20180201', '$2b$10$crN.MURgrfKQ.ZlzI/EY9eYFRrTJvg8RlOkq3jpkrgiBDZjzqPdra', '215487789', 1),
('HS20180202', '$2b$10$Li3KtRRaSo5acA0HkbBmM.OcIQ5KcCHqDGnXhVUkYwFUsAuaeG3NO', '215487789', 1),
('HS20180203', '$2b$10$u4xR485RPRnQCE/EoPk4YecKhTvQmMEBpXofHjBwgLTEQ8kYSOHha', '215487789', 1),
('HS20180204', '$2b$10$3Hl78lrb0pCv5DhbQtAv8eRmvsXAHqNZOqJ0zrY.QIt2JVStjl/ae', '215487789', 1),
('HS20180205', '$2b$10$56vvp2K2yD/Br9.B7FlM5eNrW8bytk2KkIKylqfaa.iyXzq08nzDK', '215487789', 1),
('HS20180301', '$2b$10$CcTF.kBDgiqHmUm2fP549e/Fps0qTESVBu2KNQCFmgLzFOSNI1VZe', '215487789', 1),
('HS20180302', '$2b$10$bD3jt2WjJGRma4wu2qkgmumxCESMjPr8.2/O0R/KASn3BeJlAicDi', '215487789', 1),
('HS20180303', '$2b$10$QFElnVvHTJgKm2oOeXcf3OH3RDUY.fZ8wNtbgxs6jvJ0sSCWK3J.6', '215487789', 1),
('HS20180304', '$2b$10$pdZ4wz.JuvBJhRDf0lbyT.425Vw0RsWjtxWcCWlfC3eaw2T4jC4dm', '215487789', 1),
('HS20180305', '$2b$10$4DNrsW.jZ3kmqDym8wywL.x9/TyoQawf5fNLrgjKICQHbA7CI9C5C', '215487789', 1),
('HS20180401', '$2b$10$ufOsSTVuuaY/uC1yC6qlFuq55idhtBMuL88gVmG/uP3tW1b9IG5KW', '215487789', 1),
('HS20180402', '$2b$10$WZ/v.Xgu2ItlaDJPkMWklOt9KpPfQp2hcTQo0ft7HthnYO5TzWJd.', '215487789', 1),
('HS20180403', '$2b$10$APFx6LY33D.8Fmbi2Gig0OQp2rtshXmmuJHa6yc6u3nbQTZsI8sFC', '215487789', 1),
('HS20180404', '$2b$10$OANCVR3vk2wlNCJuBY5VIO7wrtFLJrkvgDcJ4LJHcBq7ygvV3TqW6', '215487789', 1),
('HS20180405', '$2b$10$6EO4Q4etbu/BqrJCcSyCsuTY8N2B/010RftpiShkFgrH3gnZVBbry', '215487789', 1),
('HS20190101', '$2b$10$H2uNlgqgG2LQdljm1XbkYOu5fhXtBv.ItAhVSmmg0Ob1/S9b99HY.', '215487789', 1),
('HS20190102', '$2b$10$B47F4Rj7fZf7kNVZv6kePOOxjDUogt3D5dElPezAUD9wkKVcvTJC6', '215487789', 1),
('HS20190103', '$2b$10$8i.rv9qCKt3f3u58RAXPoepYZBaOlQ.46CAN8Qn.CYxpaotI35072', '215487789', 1),
('HS20190104', '$2b$10$vJW8eaNGTFUqbdlJAWQONeJHS0ZUxFt.TUdNRI1rPou08Iw4Zb.J2', '215487789', 1),
('HS20190105', '$2b$10$aFYTzhTtNd3FxKVvYU/wceSYDnG4J0QxczfPeFLsOZY7hDMw8HwDO', '215487789', 1),
('HS20190201', '$2b$10$t3kxu7f4zPWSaTwEz2cQdeM/Sg55kC7Aq3FeChg13VvSolzXcNvnG', '215487789', 1),
('HS20190202', '$2b$10$Uq3VvcCI.GxjgrfDMEiOCu22oFZCeye.iFumzLW5GhFGFbCuwoE1C', '215487789', 1),
('HS20190203', '$2b$10$f4Kx1nytuecBWKakU6/6VO5J15GGOdPnJ7L0u92OQnWwQ9or.0JDi', '215487789', 1),
('HS20190204', '$2b$10$xPpStOZoUHxXL9O2uM99WOAgjpxDWwI6C8mIXfriP6bhGQ1GCi4im', '215487789', 1),
('HS20190205', '$2b$10$huKQGaQbc4Y9JEtA5465NOu2QdoGhDuPz4oSvZdnBBmbwhViFKfbe', '215487789', 1),
('HS20190301', '$2b$10$JO5ttevUY86Y8yBydlyiGOqWbKCATPMhOdWwjVhWmr0GTj6u7Evfe', '215487789', 1),
('HS20190302', '$2b$10$8Km9bhjjI3sa5Jz4NlCgCO7YbxbdSoG1H/vAM6FOFt4Fc4FraSCYK', '215487789', 1),
('HS20190303', '$2b$10$SDf2Sm9ASpFfPQF.Nec1QO93FCBOwcEaWBUKo6rw6QA5gZQjdN/Ci', '215487789', 1),
('HS20190304', '$2b$10$GX7288Q7Rsg8lQx8B/CfBuZRkY.735EHJQSh/u.lfU26XvqDM82Dy', '215487789', 1),
('HS20190305', '$2b$10$.R7fEak5QFZZbR7h3vQhOOZPhJwB7hOMiBMm6jhmI.lu2EfwlhmVK', '215487789', 1),
('HS20190401', '$2b$10$FD/KI7FXL4GT/JL0dpB3leS9aaqDw.m36U8CJSYLUZMC.zn5K1VGG', '215487789', 1),
('HS20190402', '$2b$10$4aGIOybtrOLR8Dq5v5iA5OTwo7tpaMa9n5YmOHFWkZRYi7YMJYxJO', '215487789', 1),
('HS20190403', '$2b$10$DCngthfP0lK/sYCSW3TcBuWw2rCb41VYlRlgOBqV8RpOECLzX6PLC', '215487789', 1),
('HS20190404', '$2b$10$97uP8Z7gY3OU45jUGQIukOYnzR2ux5.l4Z7r2zyYy88j6PKb7j2c.', '215487789', 1),
('HS20190405', '$2b$10$Z5w0A0roUmjmpd68z.taceSdJj0OupKkdFSt.td3qvHaC5zQybR5m', '215487789', 1),
('HS20200101', '$2b$10$G8lnoQ3pi1T6XqpXVAljqOVLfZ1SmPojpX3Dt5d99zbWNac.w53oO', '215487789', 1),
('HS20200102', '$2b$10$9vMfETbcPaPvGL3hr2ukQu.C.lLmzRD08qH13.YquhW8lbcW2jRF2', '215487789', 1),
('HS20200103', '$2b$10$cNg3Gdw1rCUEl7sBuPbPne928ksZqVoxudDhEqNUqEXFEt40I1nsi', '215487789', 1),
('HS20200104', '$2b$10$1oPuzxPSN2wKGuEzSvWXFeA3zYFNLS6OTcwEdwiVJfY73.wT/UxHa', '215487789', 1),
('HS20200105', '$2b$10$.H1OQQGgM4txeqJQ8EE.x.w73NVlxvCsZgraOwn5poDBQmeO1T/um', '215487789', 1),
('HS20200201', '$2b$10$2g/NKyohB7aMfOCgZu/XHuWONKInzfuTz84zBKiafEC9UUAYFxtim', '215487789', 1),
('HS20200202', '$2b$10$56kgPq.HO48ehnSduPPWzeQu3.HuofzeYjrAKj/BUySuuoiJkXxoy', '215487789', 1),
('HS20200203', '$2b$10$ZLnF2OHuvi6Y/wwC.8iQn.8AH.tyWvSIFVGlTNNT4HAiGD/Glv8cq', '215487789', 1),
('HS20200204', '$2b$10$gVJrb6B3AItWH253VSyNiuOBpVDtZmjp.Xko1xBLYULcQb7HkKrOW', '215487789', 1),
('HS20200205', '$2b$10$pkVcTNdWzaR8Sh49wOcpSu5ycXG3b1W6Y07dhPlf9Y.oXErAawzIu', '215487789', 1),
('HS20200301', '$2b$10$4JMMIGUE2SVJsme.o4cqvuRQDNumzjCreKwaQrbv8ctQOFFSzOuSS', '215487789', 1),
('HS20200302', '$2b$10$bKrclZhya8dQ9K1OQoo.BOGTdmj8LuO8CDSWibvNXVhhgP7BEHZX.', '215487789', 1),
('HS20200303', '$2b$10$VQcjs5EEPxx1YL4OFY/tCe6EoT8klHSzP8tGjUecUm6.zskTAZ11e', '215487789', 1),
('HS20200304', '$2b$10$rzeXBcQeKU0R7Xg9lSvffOxXbAbpdaVJGQGmoKAeQLou8UkRcK20a', '215487789', 1),
('HS20200305', '$2b$10$RHDrmTFMi./KPwC6hUzp2u1XnQA3EZz5tW8rO6hPQv5o8JJc/J4gK', '215487789', 1),
('HS20200401', '$2b$10$..By24QBkCrhEdVe8g06Ru35j378PRmiEy2.68cN9cfSXI9TzkytK', '215487789', 1),
('HS20200402', '$2b$10$4mM3Qac0opCzNndqlaWxhesNloqV3VplYlvZlX.RhI0Zp8dpr8nH6', '215487789', 1),
('HS20200403', '$2b$10$iOb9b7.mIk/cLxN2iqIq5.XWJaLot/ut2Vj1aAfO8hOHNpPKYbmma', '215487789', 1),
('HS20200404', '$2b$10$AtPVcAqZ9GajLZnNJyXMBuI8f7VEcdpvABLWzMGLPojIdeTN9n//S', '215487789', 1),
('HS20200405', '$2b$10$JkfHd5lk7FmBAM4ImFyY3uUaiw5Nmfn1coSbDrSs6dq2AVNDZDRtO', '215487789', 1),
('NV01', '$2b$10$mxPrmLJtP5z.AjaIbZdfgOOB/iBxgOY2kiq5zW1YC1m0N5Pl9XoQC', '215487789', 4),
('NV02', '$2b$10$U1wyOBZ.CFM6MrQMn9u1FeFUXzMA.i3i0MTFzQ80oXZuGbrNygoyK', '215487789', 4),
('admin', '$2b$10$gmTdGS8ljTW2B1h4dDU7.eC9bTCSPajkPwK5wLy5dRcIrkgLeNBTq', '215487789', 5);

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
('NV01', 'Nguyễn Văn Vũ', '0000-00-00', 1, '2 Bà Trưng, Hà Nội', 'null', 1, 'GiaoVu'),
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
  `stt` int(11) NOT NULL,
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `magv` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `mabm` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `malop` varchar(15) COLLATE latin1_bin NOT NULL,
  `ngaytrongtuan` int(11) NOT NULL,
  `tiet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

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
  ADD PRIMARY KEY (`macauhoi`,`mahs`,`mahk`,`nambd`,`namkt`),
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
  ADD PRIMARY KEY (`stt`),
  ADD KEY `FK_THOIKHOABIEU_GIAOVIEN` (`magv`),
  ADD KEY `FK_THOIKHOABIEU_BOMON` (`mabm`),
  ADD KEY `FK_THOIKHOABIEU_LOPHOC` (`malop`),
  ADD KEY `FK_THOIKHOABIEU_HOCKY` (`mahk`,`nambd`,`namkt`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `dotks`
--
ALTER TABLE `dotks`
  MODIFY `stt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `nguoithan`
--
ALTER TABLE `nguoithan`
  MODIFY `stt` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thoikhoabieu`
--
ALTER TABLE `thoikhoabieu`
  MODIFY `stt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1933;

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
  ADD CONSTRAINT `FK_KQKHAOSAT_CAUHOIKS` FOREIGN KEY (`macauhoi`) REFERENCES `cauhoiks` (`macauhoi`),
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
