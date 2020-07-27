// Sơ đò lớp của EmployeeTrainingDepartment kế thừa từ Employee.

const Employee = require("./Employee");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");
const Semester = require("./Semester");
const Class = require("./Class");
const Student = require("./Student");
const RoomExam = require("./RoomExam");
const ExamRoom = require("./RoomExam");

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
  static async getClass() {
    //Câu truy vấn lấy tất cả các lớp học đang hoạt động trong trường.
    const sqlQuery =
      `SELECT LP.malop AS classID, LP.magvcn AS managerClass, GV.hoten AS managerName, LP.namnhaphoc AS course ` +
      `FROM LOPHOC AS LP INNER JOIN GIAOVIEN AS GV ON LP.magvcn=GV.magv ` +
      `WHERE LP.trangthai=1`;

    const result = await ExecuteSQL(sqlQuery);
    const latestSemester = await Semester.getLatestSemester();

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

  //Lấy danh sách học sinh trong lớp học.
  async getStudents(classID) {
    const findClass = await Class.Find(classID);

    return findClass === null ? null : await findClass.getStudentInClass();
  }

  //Lấy thông tin của một học sinh.
  async getStudent(studentID) {
    const result = await Student.Find({ id: studentID, classID: null });

    return result;
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

  //Lấy lịch thi của tất cả các khối theo học kỳ
  async getScheduleExam(semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection, BM.tenbm AS subjectName, GV.hoten AS teacherFullName ` +
      `FROM THOIKHOABIEU AS TKB, BOMON AS BM, GIAOVIEN AS GV ` +
      `WHERE GV.magv=TKB.magv AND TKB.mabm=BM.mabm AND TKB.malop='${classID} AND TKB.mahk=${semesterID} AND TKB.nambd=${yearStart} AND TKB.namkt=${yearEnd}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result;
  }

  //Lấy danh sách các phòng thi
  async getExamRoom(semesterID, yearStart, yearEnd) {
    const result = await ExamRoom.Find(semesterID, yearStart, yearEnd);
    return result;
  }

  //Lấy danh sách học sinh trong phòng thi
  async getStudentExamRoom(examRoomID, semesterID, yearStart, yearEnd) {
    const result = await ExamRoom.GetStudents(
      examRoomID,
      semesterID,
      yearStart,
      yearEnd
    );

    return result;
  }

  //Tạo phòng thi
  createExamRoom(minStudent, maxStudent) {
    //1. Lấy tất cả các học sinh
    //2. Phân loại
    //3.
    //4.
  }

  //Lấy điểm số của tất cả các học sinh
  async getScore() {
    //1. Lấy tất cả các lớp học, phân loại
    const sqlQueryGetClass = `SELECT * ` + `FROM LOPHOC ` + `WHERE 1`;

    //2. Lấy điểm của từng lớp
    //3. Phân loại điểm
    //4.
  }

  //Lấy hạnh kiểm của tất cả các học sinh
  getConduct() {
    //1. Lấy tất cả các lớp, phân loại
    //2. Lấy hạnh kiểm của từng lớp
    //3. Phân loại
  }

  //Lấy kết quả khảo sát
  getResultSurvey() {}

  //Mở đợt khảo sát
  openSurvey() {}

  //Chỉnh sửa câu hỏi phiếu khảo sát
  editQuestionSurvey() {}

  static async Find(userName) {
    const condition = typeof userName == "undefined" ? "1" : "0";
    const sqlQuery =
      `SELECT * ` +
      `FROM NHANVIEN AS NV INNER JOIN NGUOIDUNG AS ND ON NV.manv = ND.tenDangNhap ` +
      `WHERE NV.manv='${userName}' or ${condition}`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const listEmployees = [];
      for (let i = 0; i < result.length; i++) {
        const employeeOnDB = result[i];

        const id = employeeOnDB.id;
        const username = employeeOnDB.magv;
        const password = employeeOnDB.matkhau;
        const identityCard = employeeOnDB.cmnd;
        const fullName = employeeOnDB.hoten;
        const dob = new Date(employeeOnDB.dob);
        const address = employeeOnDB.diachi;
        const status = employeeOnDB.trangthai;
        const phoneNumber = employeeOnDB.std;
        const typeEmployee = employeeOnDB.loai;
        const subjectID = employeeOnDB.mabm;

        listEmployees.push(
          new Teacher(
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
          )
        );
        return listEmployees;
      }
      return null;
    }
  }
};

const exec = async () => {
  //const studentID = "HS20190101";
  const result = await EmployeeTrainingDepartment.getClass();

  console.log(result);
};

exec();

module.exports = EmployeeTrainingDepartment;
