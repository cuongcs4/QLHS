// Sơ đò lớp của Admin kế thừa từ Employee.

const Employee = require("./Employee");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const Admin = class extends Employee {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status,
    typeUser,
    phoneNumber,
    typeEmployee
  ) {
    super(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      address,
      status,
      typeUser,
      phoneNumber,
      typeEmployee
    );
  }

  static async getEmployee() {
    const sqlQuery = 
      `SELECT * ` +
      `FROM NGUOIDUNG AS ND, NHANVIEN AS NV ` +
      `WHEREOR ND.tenDangNhap = NV.manv`

    const result = await ExecuteSQL(sqlQuery);
    if (result.length !== 0){
      const listEmployee = [];
      for (let i = 0; i < result.length; i++) {
        const employeeOnDB = result[i];

        const employeeID = employeeOnDB.manv;
        const employeeName = employeeOnDB.hoten;
        const dateOfBirth = employeeOnDB.ngaysinh;
        const address = employeeOnDB.diachi;
        const state = employeeOnDB.trangthai;

        listEmployee.push({
          employeeID,
          employeeName,
          dateOfBirth,
          address,
          state
        });
      }
      return listEmployee;
    }
    return null;
  }

  disableEmployee() {}

  enableEmployee() {}

  createNewEmployee() {}

  createNewSemester() {}

  closeSemester() {}

  static async Find(userName) {
    const sqlQuery =
      `SELECT * ` +
      `FROM NGUOIDUNG AS ND INNER JOIN NHANVIEN AS NV ON ND.tenDangNhap=NV.manv ` +
      `WHERE ND.tenDangNhap='${userName}' AND NV.maloaiNV='admin'`;

    const adminOnDB = await ExecuteSQL(sqlQuery);
    const id = adminOnDB[0].manv;
    const username = adminOnDB[0].manv;
    const password = adminOnDB[0].matKhau;
    const identityCard = adminOnDB[0].cmnd;
    const fullName = adminOnDB[0].hoten;
    const dob = new Date(adminOnDB[0].ngaysinh);
    const address = adminOnDB[0].diachi;
    const status = adminOnDB[0].trangthai;
    const phoneNumber = adminOnDB[0].std;
    const typeEmployee = flagClass.TYPE_USER.ADMIN;

    return new Admin(
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
};

module.exports = Admin;
