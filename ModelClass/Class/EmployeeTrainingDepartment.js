// Sơ đò lớp của EmployeeTrainingDepartment kế thừa từ Employee.

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");

const flagClass = require("../Helper/resource/Flag");

const Semester = require("./Semester");
const Class = require("./Class");
const Student = require("./Student");
const RoomExam = require("./RoomExam");
const ExamRoom = require("./RoomExam");
const ResultSurvey = require("./ResultSurvey");
const Score = require("./Score");
const Employee = require("./Employee");

const EmployeeTrainingDepartment = class extends Employee {
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
    typeEmployee
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
      typeEmployee
    );
  }

  //Lấy tất cả các lớp đang hoạt động trong nhà trường.
  async getClass() {
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

  //Lấy thời khóa biểu của lớp học
  async getSchedule(classID, semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection, BM.tenbm AS subjectName, GV.hoten AS teacherFullName, GV.magv AS teacherID ` +
      `FROM THOIKHOABIEU AS TKB, BOMON AS BM, GIAOVIEN AS GV ` +
      `WHERE GV.magv=TKB.magv AND TKB.mabm=BM.mabm AND TKB.malop='${classID}' AND TKB.mahk=${semesterID} AND TKB.nambd=${yearStart} AND TKB.namkt=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    return result;
  }

  //Lấy lịch thi của tất cả các khối theo học kỳ
  async getScheduleExam(semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT LT.malt AS id, LT.mahk AS semesterID, LT.nambd AS yearStart, LT.namkt AS yearEnd, ` +
      `LT.maphong AS roomID, LT.mabm AS subjectID, LT.ngaythi AS dayExam, ` +
      `LT.tietBD as section, LT.khoi AS class, LT.giamthi1 AS supervisorID1, LT.giamthi2 AS supervisorID2 ` +
      `FROM LICHTHI AS LT ` +
      `WHERE LT.mahk=${semesterID} AND LT.nambd=${yearStart} AND LT.namkt=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    const listScheduleExam10 = [];
    const listScheduleExam11 = [];
    const listScheduleExam12 = [];

    for (let i = 0; i < result.length; i++) {
      switch (result[i].class) {
        case 10:
          listScheduleExam10.push(result[i]);
          break;

        case 11:
          listScheduleExam11.push(result[i]);
          break;

        case 12:
          listScheduleExam12.push(result[i]);
          break;
      }
    }

    return { listScheduleExam10, listScheduleExam11, listScheduleExam12 };
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
  getResultSurvey() {}

  //Mở đợt khảo sát
  openSurvey(dateStart, dateEnd) {}

  //Chỉnh sửa câu hỏi phiếu khảo sát
  editQuestionSurvey() {}

  static async Find(userName) {
    if (typeof userName === "undefined") {
      const sqlQuery =
        `SELECT * ` +
        `FROM NHANVIEN AS NV INNER JOIN NGUOIDUNG AS ND ON NV.manv=ND.tenDangNhap`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listEmployees = [];
        for (let i = 0; i < result.length; i++) {
          const employeeOnDB = result[i];

          const id = employeeOnDB.manv;
          const username = employeeOnDB.manv;
          const password = employeeOnDB.matKhau;
          const identityCard = employeeOnDB.cmnd;
          const fullName = employeeOnDB.hoten;
          const dob = new Date(employeeOnDB.ngaysinh);
          const gender = employeeOnDB.gioitinh;
          const address = employeeOnDB.diachi;
          const status = employeeOnDB.trangthai;
          const phoneNumber = employeeOnDB.std;
          const typeEmployee = employeeOnDB.loai;
          const typeUser = flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT;

          listEmployees.push(
            new EmployeeTrainingDepartment(
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
              typeEmployee
            )
          );
          return listEmployees;
        }
      }
      return null;
    } else {
      const sqlQuery =
        `SELECT * ` +
        `FROM NHANVIEN AS NV INNER JOIN NGUOIDUNG AS ND ON NV.manv=ND.tenDangNhap ` +
        `WHERE NV.manv='${userName}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length === 0) return null;

      const employeeOnDB = result[0];

      const id = employeeOnDB.manv;
      const username = employeeOnDB.manv;
      const password = employeeOnDB.matKhau;
      const identityCard = employeeOnDB.cmnd;
      const fullName = employeeOnDB.hoten;
      const dob = new Date(employeeOnDB.ngaysinh);
      const gender = employeeOnDB.gioitinh;
      const address = employeeOnDB.diachi;
      const status = employeeOnDB.trangthai;
      const phoneNumber = employeeOnDB.std;
      const typeEmployee = employeeOnDB.loai;
      const typeUser = flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT;

      return new EmployeeTrainingDepartment(
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
        typeEmployee
      );
    }
  }
};

// const exec = async () => {
//   //const studentID = "HS20190101";
//   const result = await EmployeeTrainingDepartment.getClass();

//   console.log(result);
// };

// exec();

module.exports = EmployeeTrainingDepartment;
