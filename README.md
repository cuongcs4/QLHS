# Sinh viên thực hiện:

### 1. Phan Lê Hoài Bảo - 1712289

### 2. Nguyễn Tạ Phú Cường - 1712313

# Đề tài:

- Trang web quản lý học sinh cấp 3

# Công nghệ:

- Web server: NodeJS + ExpressJS. (View engine: Handlebar)
- Database server: mySQL

# Cài đặt để tiến hành chạy demo: (dữ liệu được đặt trong thư mục "Bộ data demo")

## 1. Setup database:

    - Loại database: mySQL
    - Tạo cơ sở dữ liệu có tên: qlhs
    - Tạo tài khoản login cho server:
    	+ username: adminDB
    	+ password: adminDB
    - Chạy file qlhs.sql để tạo bảng và tạo dữ liệu ban đầu.

## 2. Các file data:

    - "data danh sách học sinh" : dùng cho chức năng thêm lớp học của giáo vụ.
    - "data điểm LH201801" : dùng cho chức năng sửa điểm của giáo viên cho lớp học LH201801.
    - "data hạnh kiểm" : dùng cho chức năng sửa hạnh kiểm của lớp học LH201801.
    - "data lịch thi" : dùng cho chức năng thêm lịch thi của giáo vụ.
    - "file random" : dùng để kiểm tra khả năng báo lỗi của chức năng import file.
