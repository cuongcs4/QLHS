// Sơ đò lớp của EmployeeTrainingDepartment kế thừa từ Employee.

const Employee = require("./Employee");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const EmployeeTrainingDepartment = class extends Employee {
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

  //Lấy tất cả các lớp đang hoạt động trong nhà trường.
  getClass() {}

  getStudents() {}

  getStudent() {}

  createNewStudent() {}

  createNewClass() {}

  getSchedule() {}

  getScheduleExam() {}

  getExamRoom() {}

  getStudentExamRoom() {}

  createExamRoom() {}

  getScore() {}

  getConduct() {}

  getResultSurvey() {}

  openSurvey() {}

  editQuestionSurvey() {}

  static async Find(userName) {
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

    return new EmployeeTrainingDepartment(
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

module.exports = EmployeeTrainingDepartment;
