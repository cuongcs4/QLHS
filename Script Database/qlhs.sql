-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 31, 2020 lúc 03:34 PM
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
  `mahk` int(11) NOT NULL,
  `nambd` int(11) NOT NULL,
  `namkt` int(11) NOT NULL,
  `maphong` varchar(15) COLLATE latin1_bin NOT NULL,
  `mabm` varchar(15) COLLATE latin1_bin NOT NULL,
  `ngaythi` date NOT NULL,
  `tietBD` int(11) NOT NULL,
  `giamthi1` varchar(15) COLLATE latin1_bin DEFAULT NULL,
  `giamthi2` varchar(15) COLLATE latin1_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loainv`
--

CREATE TABLE `loainv` (
  `maloai` varchar(15) COLLATE latin1_bin NOT NULL,
  `tenloai` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phonghoc`
--

CREATE TABLE `phonghoc` (
  `maphong` varchar(15) COLLATE latin1_bin NOT NULL,
  `tenphong` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `loaiphong` varchar(15) COLLATE latin1_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

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
  ADD PRIMARY KEY (`mahk`,`nambd`,`namkt`,`maphong`,`mabm`,`ngaythi`,`tietBD`),
  ADD KEY `FK_LICHTHI_PHONGHOC` (`maphong`),
  ADD KEY `FK_LICHTHI_BOMON` (`mabm`),
  ADD KEY `FK_LICHTHI_GIAOVIEN1` (`giamthi1`),
  ADD KEY `FK_LICHTHI_GIAOVIEN2` (`giamthi2`);

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
  ADD PRIMARY KEY (`stt`,`mahs`),
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
