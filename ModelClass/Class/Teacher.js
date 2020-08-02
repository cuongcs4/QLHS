// Sơ đò lớp của Teacher kế thừa từ Employee.

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");

const flagClass = require("../Helper/resource/Flag");

const Employee = require("./Employee");
const Class = require("./Class");
const Semester = require("./Semester");
const Score = require("./Score");
const ReExamination = require("./ReExamination");
const TeachingPlan = require("./TeachingPlan");
const ExamPlan = require("./ExamPlan");
const Subject = require("./Subject");
const Student = require("./Student");

const Teacher = class extends Employee {
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
    typeEmployee,
    subjectID
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
    this.subjectID = subjectID || null;
  }

  getSubjectID() {
    return this.subjectID;
  }

  async getSubjectName() {
    const result = await Subject.Find(this.subjectID);

    return result.getSubjectName();
  }

  setSubject(newSubjectID) {
    this.subjectID = newSubjectID;
  }

  async getClass(semesterID, yearStart, yearEnd) {
    console.log("TEACHER GET CLASS TEACHER.JS");

    //Mặc định lấy những lớp học ở học kỳ hiện tại nếu có.
    if (typeof semesterID == "undefined") {
      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    const sqlQuery =
      `SELECT TKB.malop AS classID ` +
      `FROM THOIKHOABIEU AS TKB ` +
      `WHERE TKB.magv='${this.id}' AND TKB.mahk='${semesterID}' AND TKB.nambd='${yearStart}' AND TKB.namkt='${yearEnd}' ` +
      `GROUP BY TKB.malop`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const listClass = [];

      for (let i = 0; i < result.length; i++) {
        listClass.push(await Class.Find(result[i].classID));
      }

      return listClass;
    }

    return [];
  }

  //Lấy danh sách điểm theo lớp
  async getScore(classID, semesterID, yearStart, yearEnd) {
    const scores = await Score.Find(
      { studentID: null, subjectID: this.subjectID, classID: classID },
      semesterID,
      yearStart,
      yearEnd
    );

    return scores;
  }

  async getReExamination(semesterID, yearStart, yearEnd) {
    const result = await ReExamine.Find(
      { teacherID: this.id, studentID: null },
      semesterID,
      yearStart,
      yearEnd
    );

    return result;
  }

  //Lấy thời khóa biểu của giáo viên
  async getSchedule(semesterID, yearStart, yearEnd) {
    const result = await TeachingPlan.Find(
      { teacherID: this.id, classID: null },
      semesterID,
      yearStart,
      yearEnd
    );

    return result;
  }

  async getScheduleExam(semesterID, yearStart, yearEnd) {
    const result = await ExamPlan.Find(
      { studentID: null, teacherID: this.id },
      semesterID,
      yearStart,
      yearEnd
    );

    return result;
  }

  static async Find(userName) {
    if (typeof userName === "undefined") {
      const sqlQuery =
        `SELECT * ` +
        `FROM GIAOVIEN AS GV INNER JOIN NGUOIDUNG AS ND ON GV.magv = ND.tenDangNhap `;

      const result = await ExecuteSQL(sqlQuery);
      if (result.length !== 0) {
        const listTeachers = [];
        for (let i = 0; i < result.length; i++) {
          const teacherOnDB = result[i];

          const id = teacherOnDB.magv;
          const username = teacherOnDB.magv;
          const password = teacherOnDB.matKhau;
          const identityCard = teacherOnDB.cmnd;
          const fullName = teacherOnDB.hoten;
          const dob = new Date(teacherOnDB.ngaysinh);
          const gender = teacherOnDB.gioitinh;
          const address = teacherOnDB.diachi;
          const status = teacherOnDB.trangthai;
          const phoneNumber = teacherOnDB.sdt;
          const typeEmployee = teacherOnDB.loai;
          const subjectID = teacherOnDB.mabm;
          const typeUser = flagClass.TYPE_USER.TEACHER;

          listTeachers.push(
            new Teacher(
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
              typeEmployee,
              subjectID
            )
          ); 
        }
        return listTeachers;
      }
      return null;
    }

    const sqlQuery =
      `SELECT * ` +
      `FROM GIAOVIEN AS GV INNER JOIN NGUOIDUNG AS ND ON GV.magv = ND.tenDangNhap ` +
      `WHERE GV.magv='${userName}'`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length === 0) return null;

    const teacherOnDB = result[0];

    const id = teacherOnDB.magv;
    const username = teacherOnDB.magv;
    const password = teacherOnDB.matKhau;
    const identityCard = teacherOnDB.cmnd;
    const fullName = teacherOnDB.hoten;
    const dob = new Date(teacherOnDB.ngaysinh);
    const gender = teacherOnDB.gioitinh;
    const address = teacherOnDB.diachi;
    const status = teacherOnDB.trangthai;
    const phoneNumber = teacherOnDB.std;
    const typeEmployee = teacherOnDB.loai;
    const subjectID = teacherOnDB.mabm;

    return new Teacher(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      phoneNumber,
      typeEmployee,
      subjectID
    );
  }

  static async Save(teacher) {
    const isExist = await checkExist(
      "NGUOIDUNG",
      "tenDangNhap",
      teacher.username
    );
    const dobArray = teacher.dob.split("-")
      const dobFormat = `${dobArray[2]}-${dobArray[1]}-${dobArray[0]}`;
    if (isExist) {
      //update
      //1. update NGUOIDUNG
      const sqlQuery1 =
        `UPDATE NGUOIDUNG ` +
        `SET matKhau="${teacher.getPassWord()}", cmnd='${teacher.getIdentityCard()}' ` +
        `WHERE tenDangNhap='${teacher.getUserName()}'`;
      await ExecuteSQL(sqlQuery1);

      //2. update GIAOVIEN
      const sqlQuery2 =
        `UPDATE GIAOVIEN ` +
        `SET ngaysinh="${dobFormat}", ` +
        `hoten="${teacher.getFullName()}", ` +
        `diachi="${teacher.getAddress()}", ` +
        `sdt="${teacher.getPhoneNumber()}", ` +
        `gioitinh="${teacher.getGender()}", ` +
        `mabm="${teacher.getSubjectID()}", ` +
        `trangthai=${teacher.getStatus()} ` +
        `WHERE magv="${teacher.getUserName()}"`;
      await ExecuteSQL(sqlQuery2);

      return flagClass.DB.UPDATE;
    }
    //insert
    dobFormat = `${teacher.dob.getFullYear()}-${
      teacher.dob.getMonth() + 1
    }-${teacher.dob.getDate()}`;
    //1. Insert NGUOIDUNG
    const sqlQuery1 =
      `INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, cmnd, loai) ` +
      `VALUES ('${teacher.getUserName()}', '${teacher.getPassWord()}', '${teacher.getIdentityCard()}', ${
        flagClass.TYPE_USER.TEACHER
      })`;

    await ExecuteSQL(sqlQuery1);

    //2. Insert GIAOVIEN
    const sqlQuery2 =
      `INSERT INTO GIAOVIEN (magv, ngaysinh, hoten, diachi, gioitinh, sdt, mabm, trangthai) ` +
      `VALUES ('${teacher.getUserName()}', '${dobFormat}', '${teacher.getFullName()}', '${teacher.getAddress()}', '${teacher.getGender()}', '${teacher.getPhoneNumber()}', '${teacher.getSubjectID()}', ${teacher.getStatus()})`;

    await ExecuteSQL(sqlQuery2);

    return flagClass.DB.NEW;
  }
};

// const exec = async () => {
//   console.log("Teacher");

//   const result = await Teacher.Find("GV01");

//   console.log(result);
// };

// exec();
module.exports = Teacher;
