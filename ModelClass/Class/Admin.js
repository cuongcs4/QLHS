// Sơ đò lớp của Admin kế thừa từ Employee.

const Employee = require("./Employee");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");
const Teacher = require("./Teacher");
const EmployeeTrainingDepartment = require("./EmployeeTrainingDepartment");
const { enable } = require("debug");

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

  async getEmployee() {
    const listTeachers = await Teacher.Find();
    const listEmployees = await EmployeeTrainingDepartment.Find();
    return { listTeachers, listEmployees };
  }

  async disableEmployee(username) {
    const teacher = await Teacher.Find(username);
    const employee = await EmployeeTrainingDepartment.Find(username);
    if (teacher !== null) {
      teacher[0].status = flagClass.STATUS(DISABLE); //
      await Teacher.Save(teacher[0]);
    } else if (employee !== null) {
      employee[0].status = flagClass.STATUS(DISABLE);
      await EmployeeTrainingDepartment.Save(employee[0]);
    } else {
      return null;
    }
  }

  async enableEmployee() {
    const teacher = await Teacher.Find(username);
    const employee = await EmployeeTrainingDepartment.Find(username);
    if (teacher !== null) {
      teacher[0].status = flagClass.STATUS.ENABLE; //
      await Teacher.Save(teacher[0]);
    } else if (employee !== null) {
      employee[0].status = flagClass.STATUS.ENABLE;
      await EmployeeTrainingDepartment.Save(employee[0]);
    } else {
      return null;
    }
  }

  async createNewEmployee(employee) {
    if (employee.typeEmployee === flagClass.TYPE_USER.TEACHER)
    {
      await Teacher.Save(employee);
    }
    else if (employee.typeEmployee === flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT){
      await EmployeeTrainingDepartment.Save(employee);
    }
  }

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
    const typeUser = flagClass.TYPE_USER.ADMIN;

    return new Admin(
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
};

// const exec = async () => {
//   const teacher = new EmployeeTrainingDepartment('1','GV21','GV21','215487789','Nguyễn Văn Trỗi',new Date(1999,02,25),null,1,2,'0987654321',4);
//   console.log(teacher);
//   if (teacher.typeEmployee === flagClass.TYPE_USER.TEACHER)
//     {
//       const result = await Teacher.Save(teacher);
//       console.log(result)
//     }
//   else if (employee.typeEmployee === flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT){
//       const result = await EmployeeTrainingDepartment.Save(employee);
//       console.log(result)
//     }

// }
// exec();

module.exports = Admin;
