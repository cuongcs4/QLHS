// Sơ đò lớp của EmployeeTrainingDepartment kế thừa từ Employee.

const Employee = require("./Employee");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");
const Semester = require("./Semester");
const Class = require("./Class");
const Student = require("./Student");

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
  async getClass() {
    //Câu truy vấn lấy tất cả các lớp học đang hoạt động trong trường.
    const sqlQuery =
      `SELECT LP.malop AS classID, LP.magvcn AS managerClass, GV.hoten AS managerName, LP.namnhaphoc AS course ` +
      `FROM LOPHOC AS LP INNER JOIN GIAOVIEN AS GV ON LP.magvcn=GV.magv ` +
      `WHERE LP.trangthai=1`;

    const result = await ExecuteSQL(sqlQuery);
    const latestSemester = await Semester.GetLatestSemester();

    //Phân loại lớp học
    const listClass10 = [];
    const listClass11 = [];
    const listClass12 = [];

    for (let i = 0; i < result.length; i++) {
      const itemClass = result[i];
      const course = itemClass.course - latestSemester.getYearStart() + 10;

      switch (course) {
        case 10:
          listClass10.push(itemClass);
          break;

        case 11:
          listClass10.push(itemClass);
          break;

        case 12:
          listClass10.push(itemClass);
          break;
      }
    }

    //Trả về kết quả
    return { listClass10, listClass11, listClass12 };
  }

  //Lấy danh sách học sinh trong lớp học.
  async getStudents(classID) {
    const sqlQuery =
      `SELECT HS.mahs AS studentID, HS.hoten AS fullName, HS.ngaysinh AS dob, HS.trangthai AS status ` +
      `FROM LOPHOC AS LH INNER JOIN HOCSINH AS HS ON HS.malop=LH.malop ` +
      `WHERE LH.malop='${classID}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result;
  }

  //Lấy thông tin của một học sinh.
  async getStudent(studentID) {
    const sqlQuery =
      `SELECT HS.mahs AS studentID, HS.hoten AS fullName, HS.ngaysinh AS dob, HS.trangthai AS status ` +
      `FROM HOCSINH AS HS ` +
      `WHERE HS.mahs='${studentID}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result[0];
  }

  //Tạo mới và lưu học sinh vào cơ sở dữ liệu
  createNewStudent(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status,
    typeUser,
    classID
  ) {
    Student.Save(
      new Student(
        id,
        username,
        password,
        identityCard,
        fullName,
        dob,
        address,
        status,
        typeUser,
        classID
      )
    );
  }

  //Tạo mới và lưu lớp học vào cơ sở dữ liệu.
  createNewClass(classID, managerClass, roomID, course) {
    Class.Save(
      new Class(classID, managerClass, roomID, course, flagClass.STATUS.ENABLE)
    );
  }

  //Lấy thời khóa biểu của lớp học
  async getSchedule(classID, semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection, BM.tenbm AS subjectName, GV.hoten AS teacherFullName ` +
      `FROM THOIKHOABIEU AS TKB, BOMON AS BM, GIAOVIEN AS GV ` +
      `WHERE GV.magv=TKB.magv AND TKB.mabm=BM.mabm AND TKB.malop='${classID} AND TKB.mahk=${semesterID} AND TKB.nambd=${yearStart} AND TKB.namkt=${yearEnd}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result;
  }

  //Lấy lịch thi của tất cả các khối
  async getScheduleExam() {
    const sqlQuery =
      `SELECT TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection, BM.tenbm AS subjectName, GV.hoten AS teacherFullName ` +
      `FROM THOIKHOABIEU AS TKB, BOMON AS BM, GIAOVIEN AS GV ` +
      `WHERE GV.magv=TKB.magv AND TKB.mabm=BM.mabm AND TKB.malop='${classID} AND TKB.mahk=${semesterID} AND TKB.nambd=${yearStart} AND TKB.namkt=${yearEnd}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result;
  }

  //Lấy danh sách các phòng thi
  async getExamRoom(semesterID, yearStart, yearEnd) {
    if (semesterID === null) {
      const latestSemester = await Semester.GetLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    const sqlQuery =
      `SELECT * ` +
      `FROM PHONGTHI AS PT ` +
      `WHERE PT.mahk=${semesterID} AND PT.nambd=${yearStart} AND PT.namkt=${yearEnd}`;
  }

  //Lấy danh sách học sinh trong phòng thi
  getStudentExamRoom(examRoomID) {}

  //Tạo phòng thi
  createExamRoom() {}

  //Lấy điểm số của tất cả các học sinh
  getScore() {}

  //Lấy hạnh kiểm của tất cả các học sinh
  getConduct() {}

  //Lấy kết quả khảo sát
  getResultSurvey() {}

  //Mở đợt khảo sát
  openSurvey() {}

  //Chỉnh sửa câu hỏi phiếu khảo sát
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
