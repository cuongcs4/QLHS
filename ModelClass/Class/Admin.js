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
const Conduct = require("./Conduct");

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
    phoneNumber
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
      phoneNumber
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

  async getClass() {
    //Câu truy vấn lấy tất cả các lớp học đang hoạt động trong trường.
    const sqlQuery =
      `SELECT LH.malop AS classID, LH.namnhaphoc AS course, LH.magvcn AS teacherID ` +
      `FROM LOPHOC AS LH ` +
      `WHERE LH.trangthai=1`;

    const result = await ExecuteSQL(sqlQuery);
    const latestSemester = await Semester.getLatestSemester();

    //Phân loại lớp học
    const listClass10 = [];
    const listClass11 = [];
    const listClass12 = [];

    for (let i = 0; i < result.length; i++) {
      const itemClass = result[i];
      const course = latestSemester.getYearStart() - itemClass.course + 10;

      switch (course) {
        case 10:
          listClass10.push(itemClass);
          break;

        case 11:
          listClass11.push(itemClass);
          break;

        case 12:
          listClass12.push(itemClass);
          break;
      }
    }

    //Trả về kết quả
    return { listClass10, listClass11, listClass12 };
  }

  async createNewSemester() {
    //Tạo học kỳ mới
    const latestSemester = await Semester.getLatestSemester();
    latestSemester.semesterID++;

    if (latestSemester.semesterID > 2) {
      latestSemester.yearStart++;
      latestSemester.yearEnd++;
      latestSemester.semesterID = 1;
    }

    latestSemester.setStatus(flagClass.STATUS.ENABLE);
    await Semester.Save(latestSemester);

    //Tạo điểm, hạnh kiểm cho từng học sinh.
    //1. Lấy toàn bộ bộ môn
    const listSubject = await Subject.Find();

    //2. Lấy toàn bộ học sinh
    const listClass = await this.getClass();

    //3. Tạo điểm, hạnh kiểm cho học sinh.
    for (let i in listClass) {
      for (let j = 0; j < listClass[i].length; j++) {
        const { teacherID, classID } = listClass[i][j];

        //Tạo thời khóa biểu
        for (let k = 1; k <= 6; k++) {
          for (let h = 1; h <= 10; h++) {
            const newTeachingPlan = new TeachingPlan(
              latestSemester,
              null,
              null,
              classID,
              k,
              h
            );

            console.log(newTeachingPlan);

            TeachingPlan.Insert(newTeachingPlan);
          }
        }

        const listStudent = await Student.Find({
          id: null,
          classID: classID,
        });

        console.log(listStudent);

        for (let k = 0; k < listStudent.length; k++) {
          const studentID = listStudent[k].getID();
          //tạo điểm
          for (let h = 0; h < listSubject.length; h++) {
            const { subjectID } = listSubject[h];

            const newScore = new Score(
              latestSemester,
              studentID,
              classID,
              subjectID,
              0,
              0,
              0,
              0
            );

            Score.Insert(newScore);
          }

          //Tạo hạnh kiểm.
          const newConduct = new Conduct(
            latestSemester,
            studentID,
            classID,
            teacherID,
            4
          );
          Conduct.Insert(newConduct);
        }
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
      phoneNumber
    );
  }
};

module.exports = Admin;
