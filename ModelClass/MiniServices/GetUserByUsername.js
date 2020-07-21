const ExecuteSQL = require("../Database/ExecuteSQL");
const Admin = require("../Class/Admin");
const Teacher = require("../Class/Teacher");
const EmployeeTrainingDepartment = require("../Class/EmployeeTrainingDepartment");
const Student = require("../Class/Student");
const flagClass = require("../MiniServices/Flag");

const getUserByUsername = async (userName) => {
  const sql = `SELECT * FROM NGUOIDUNG WHERE tenDangNhap='${userName}'`;
  const result = await ExecuteSQL(sql);

  if (result.length !== 0) {
    let usr;

    switch (result[0].loai) {
      case flagClass.TYPE_USER.ADMIN:
        {
          const sqlQuery =
            `SELECT * ` +
            `FROM NGUOIDUNG AS ND INNER JOIN NHANVIEN AS NV ON ND.tenDangNhap=NV.manv ` +
            `WHERE tenDangNhap='${userName}' AND NV.maloaiNV='admin'`;

          const employeeOnDB = await ExecuteSQL(sqlQuery);
          const id = employeeOnDB[0].manv;
          const username = employeeOnDB[0].manv;
          const password = employeeOnDB[0].matKhau;
          const identityCard = employeeOnDB[0].cmnd;
          const fullName = employeeOnDB[0].hoten;
          const dob = new Date(employeeOnDB[0].ngaysinh);
          const address = employeeOnDB[0].diachi;
          const status = employeeOnDB[0].trangthai;
          const phoneNumber = employeeOnDB[0].std;
          const typeEmployee = flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT;

          usr = new EmployeeTrainingDepartment(
            id,
            username,
            password,
            identityCard,
            fullName,
            dob,
            address,
            status,
            phoneNumber,
            typeEmployee
          );
        }
        break;

      case flagClass.TYPE_USER.TEACHER:
        {
          const sqlQuery =
            `SELECT * ` +
            `FROM NGUOIDUNG AS ND INNER JOIN GIAOVIEN AS GV ON ND.tenDangNhap=GV.magv ` +
            `WHERE tenDangNhap='${userName}'`;

          const teacherOnDB = await ExecuteSQL(sqlQuery);
          const id = teacherOnDB[0].magv;
          const username = teacherOnDB[0].magv;
          const password = teacherOnDB[0].matKhau;
          const identityCard = teacherOnDB[0].cmnd;
          const fullName = teacherOnDB[0].hoten;
          const dob = new Date(teacherOnDB[0].ngaysinh);
          const address = teacherOnDB[0].diachi;
          const status = teacherOnDB[0].trangthai;
          const phoneNumber = teacherOnDB[0].std;
          const typeEmployee = flagClass.TYPE_USER.TEACHER;
          const subjectID = teacherOnDB[0].mabm;

          usr = new Teacher(
            id,
            username,
            password,
            identityCard,
            fullName,
            dob,
            address,
            status,
            phoneNumber,
            typeEmployee,
            subjectID
          );
        }

        break;

      case flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT:
        {
          const sqlQuery =
            `SELECT * ` +
            `FROM NGUOIDUNG AS ND INNER JOIN NHANVIEN AS NV ON ND.tenDangNhap=NV.manv ` +
            `WHERE tenDangNhap='${userName}' AND NV.maloaiNV='gvu'`;

          const employeeOnDB = await ExecuteSQL(sqlQuery);
          const id = employeeOnDB[0].manv;
          const username = employeeOnDB[0].manv;
          const password = employeeOnDB[0].matKhau;
          const identityCard = employeeOnDB[0].cmnd;
          const fullName = employeeOnDB[0].hoten;
          const dob = new Date(employeeOnDB[0].ngaysinh);
          const address = employeeOnDB[0].diachi;
          const status = employeeOnDB[0].trangthai;
          const phoneNumber = employeeOnDB[0].std;
          const typeEmployee = flagClass.TYPE_USER.ADMIN;

          usr = new Admin(
            id,
            username,
            password,
            identityCard,
            fullName,
            dob,
            address,
            status,
            phoneNumber,
            typeEmployee
          );
        }
        break;

      case flagClass.TYPE_USER.STUDENT:
        {
          const sqlQueryStudent =
            `SELECT * ` +
            `FROM NGUOIDUNG AS ND INNER JOIN HOCSINH AS HS ON ND.tenDangNhap=HS.mahs ` +
            `WHERE tenDangNhap='${userName}'`;

          const studentOnDB = await ExecuteSQL(sqlQueryStudent);
          const id = studentOnDB[0].mahs;
          const username = studentOnDB[0].mahs;
          const password = studentOnDB[0].matKhau;
          const identityCard = studentOnDB[0].cmnd;
          const fullName = studentOnDB[0].hoten;
          const dob = new Date(studentOnDB[0].ngaysinh);
          const address = studentOnDB[0].diachi;
          const status = studentOnDB[0].trangthai;
          const classID = studentOnDB[0].malop;

          usr = new Student(
            id,
            username,
            password,
            identityCard,
            fullName,
            dob,
            address,
            status,
            classID
          );
        }
        break;
    }

    return usr;
  }

  return null;
};

module.exports = getUserByUsername;
