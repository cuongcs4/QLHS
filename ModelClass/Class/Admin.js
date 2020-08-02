// Sơ đò lớp của Admin kế thừa từ Employee.

const { enable } = require("debug");

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");

const flagClass = require("../Helper/resource/Flag");

const Employee = require("./Employee");
const Teacher = require("./Teacher");
const EmployeeTrainingDepartment = require("./EmployeeTrainingDepartment");
const TeachingPlan = require("./TeachingPlan");
const Student = require("./Student");
const Subject = require("./Subject");
const Score = require("./Score");
const Semester = require("./Semester");

const Admin = class extends Employee {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    gender,
    address,
    status,
    typeUser,
    phoneNumber,
  ) {
    super(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      typeUser,
      phoneNumber,
    );
  }

  static async getEmployee() {
    const listTeachers = await Teacher.Find();
    const listEmployees = await EmployeeTrainingDepartment.Find();
    console.log(listTeachers);
    return { listTeachers, listEmployees };
  }

  async disableEmployee(username) {
    const teacher = await Teacher.Find(username);
    const employee = await EmployeeTrainingDepartment.Find(username);
    if (teacher !== null) {
      teacher.status = flagClass.STATUS.DISABLE; //
      await Teacher.Save(teacher);
    } else if (employee !== null) {
      employee.status = flagClass.STATUS.DISABLE;
      await EmployeeTrainingDepartment.Save(employee);
    } else {
      return null;
    }
  }

  async enableEmployee() {
    const teacher = await Teacher.Find(username);
    const employee = await EmployeeTrainingDepartment.Find(username);
    if (teacher !== null) {
      teacher.status = flagClass.STATUS.ENABLE; //
      await Teacher.Save(teacher);
    } else if (employee !== null) {
      employee.status = flagClass.STATUS.ENABLE;
      await EmployeeTrainingDepartment.Save(employee);
    } else {
      return null;
    }
  }

  async createNewEmployee(employee) {
    if (employee.typeUser === flagClass.TYPE_USER.TEACHER) {
      await Teacher.Save(employee);
    } else if (
      employee.typeUser === flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT
    ) {
      await EmployeeTrainingDepartment.Save(employee);
    }
  }

  static async createNewSemester() {
    const listStudents = await Student.Find({ id: null, class: null });
    const listSubjects = await Subject.Find();
    const lastSemester = await Semester.getLatestSemester();
    if (lastSemester.mahk === 1) {
      lastSemester.mahk = 2;
    } else {
      lastSemester.mahk = 1;
      lastSemester.nambd += 1;
      lastSemester.namkt += 1;
    }
    const newSemester = new Semester(
      lastSemester.mahk,
      lastSemester.nambd,
      lastSemester.namkt,
      flagClass.status.ENABLE
    );
    await Semester.Save(newSemester);
    for (let i = 0; i < listStudents.length; i++) {
      const student = listStudents[i];
      const studentNewScoreBoard = [];
      for (let j = 0; j < listSubjects.length; j++) {
        const subject = listSubjects[j];
        const studentID = student.username;
        const subjectID = subject.subjectID;
      }
    }
  }

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
    const gender = adminOnDB[0].gioitinh;
    const address = adminOnDB[0].diachi;
    const status = adminOnDB[0].trangthai;
    const phoneNumber = adminOnDB[0].std;
    const typeUser = flagClass.TYPE_USER.ADMIN;

    return new Admin(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      typeUser,
      phoneNumber,
    );
  }
};

module.exports = Admin;
