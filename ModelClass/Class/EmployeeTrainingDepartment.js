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
const ResultSurvey = require("./ResultSurvey");
const Score = require("./Score");

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
      `SELECT LH.malop AS classID, LH.magvcn AS managerClass, GV.hoten AS managerName, LH.namnhaphoc AS course, LH.maphong AS roomID, LH.trangthai AS status ` +
      `FROM LOPHOC AS LH INNER JOIN GIAOVIEN AS GV ON LH.magvcn=GV.magv ` +
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
  //1. Lấy tất cả các lớp học, chia khối
  //2. Lấy tất cả các học sinh trong lớp, phân loại, tính loại
  static async getScore(semesterID, yearStart, yearEnd) {
    console.log("getScore");
    //1. Lấy tất cả các lớp học, phân loại
    const class10 = { type1: 0, type2: 0, type3: 0, type4: 0, type5: 0 };
    const class11 = { type1: 0, type2: 0, type3: 0, type4: 0, type5: 0 };
    const class12 = { type1: 0, type2: 0, type3: 0, type4: 0, type5: 0 };

    const { listClass10, listClass11, listClass12 } = await this.getClass();

    //Phân loại lớp 10
    for (let i = 0; i < listClass10.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass10[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].classifyAverageScore(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.SCORE.TYPE_1:
            class10.type1++;
            break;

          case flagClass.SCORE.TYPE_2:
            class10.type2++;
            break;

          case flagClass.SCORE.TYPE_3:
            class10.type3++;
            break;

          case flagClass.SCORE.TYPE_4:
            class10.type4++;
            break;

          case flagClass.SCORE.TYPE_5:
            class10.type5++;
            break;
        }
      }
    }

    //Phân loại lớp 11
    for (let i = 0; i < listClass11.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass11[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].classifyAverageScore(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.SCORE.TYPE_1:
            class11.type1++;
            break;

          case flagClass.SCORE.TYPE_2:
            class11.type2++;
            break;

          case flagClass.SCORE.TYPE_3:
            class11.type3++;
            break;

          case flagClass.SCORE.TYPE_4:
            class11.type4++;
            break;

          case flagClass.SCORE.TYPE_5:
            class11.type5++;
            break;
        }
      }
    }

    //Phân loại lớp 12
    for (let i = 0; i < listClass12.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass12[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].classifyAverageScore(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.SCORE.TYPE_1:
            class12.type1++;
            break;

          case flagClass.SCORE.TYPE_2:
            class12.type2++;
            break;

          case flagClass.SCORE.TYPE_3:
            class12.type3++;
            break;

          case flagClass.SCORE.TYPE_4:
            class12.type4++;
            break;

          case flagClass.SCORE.TYPE_5:
            class12.type5++;
            break;
        }
      }
    }

    return { class10, class11, class12 };
  }

  //Lấy hạnh kiểm của tất cả các học sinh
  static async getConduct(semesterID, yearStart, yearEnd) {
    //1. Lấy tất cả các lớp học, phân loại
    const class10 = { type1: 0, type2: 0, type3: 0, type4: 0 };
    const class11 = { type1: 0, type2: 0, type3: 0, type4: 0 };
    const class12 = { type1: 0, type2: 0, type3: 0, type4: 0 };

    const { listClass10, listClass11, listClass12 } = await this.getClass();

    //Phân loại lớp 10
    for (let i = 0; i < listClass10.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass10[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].getConduct(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.CONDUCT.TYPE_1:
            class10.type1++;
            break;

          case flagClass.CONDUCT.TYPE_2:
            class10.type2++;
            break;

          case flagClass.CONDUCT.TYPE_3:
            class10.type3++;
            break;

          case flagClass.CONDUCT.TYPE_4:
            class10.type4++;
            break;
        }
      }
    }

    //Phân loại lớp 11
    for (let i = 0; i < listClass11.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass11[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].getConduct(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.CONDUCT.TYPE_1:
            class11.type1++;
            break;

          case flagClass.CONDUCT.TYPE_2:
            class11.type2++;
            break;

          case flagClass.CONDUCT.TYPE_3:
            class11.type3++;
            break;

          case flagClass.CONDUCT.TYPE_4:
            class11.type4++;
            break;
        }
      }
    }

    //Phân loại lớp 12
    for (let i = 0; i < listClass12.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass12[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].getConduct(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.CONDUCT.TYPE_1:
            class12.type1++;
            break;

          case flagClass.CONDUCT.TYPE_2:
            class12.type2++;
            break;

          case flagClass.CONDUCT.TYPE_3:
            class12.type3++;
            break;

          case flagClass.CONDUCT.TYPE_4:
            class12.type4++;
            break;
        }
      }
    }

    return { class10, class11, class12 };
  }

  //Lấy kết quả khảo sát
  async getResultSurvey(semesterID, yearStart, yearEnd) {
    const result = await ResultSurvey.Find(semesterID, yearStart, yearEnd);

    return result;
  }

  //Mở đợt khảo sát
  openSurvey(dateStart, dateEnd) {}

  //Chỉnh sửa câu hỏi phiếu khảo sát
  editQuestionSurvey() {}

  static async Find(userName) {
    const condition =
      typeof userName == "undefined" ? "1" : `tenDangNhap='${userName}'`;

    const sqlQuery =
      `SELECT * ` +
      `FROM NGUOIDUNG AS ND INNER JOIN NHANVIEN AS NV ON ND.tenDangNhap=NV.manv ` +
      `WHERE ${condition} AND NV.maloaiNV='GiaoVu'`;

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

// const exec = async () => {
//   const studentID = "HS20190101";
//   const result = await EmployeeTrainingDepartment.getConduct();

//   console.log(result);

//   //const student = await Student.Find({ id: studentID, classID: null });
//   //console.log(await student.getConduct());
// };

// exec();

module.exports = EmployeeTrainingDepartment;
