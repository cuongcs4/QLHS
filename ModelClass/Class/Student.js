// Sơ đò lớp của Student kế thừa từ User.

const User = require("./User");
const Semester = require("./Semester");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const Student = class extends User {
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
    classID
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
      typeUser
    );
    this.classID = classID || null;
  }

  getClassID() {
    return this.classID;
  }
  setClassID(newClassID) {
    this.classID = newClassID;
  }

  static async getSchedule(classID, semesterID, yearStart, yearEnd) {
    if (classID) {
      if (typeof semesterID === "undefined") {
        const lastestSemester = await semesterID.getLastestSemester();
        semesterID = lastestSemester.getSemesterID();
        yearStart = lastestSemester.getYearStart();
        yearEnd = lastestSemester.getYearEnd();
      }
      const sqlQuery = 
        `SELECT * ` +
        `FROM THOIKHOABIEU AS TKB ` +
        `WHERE TKB.malop ='${classID}' AND TKB.mahk = '${semesterID}' AND TKB.nambd = '${yearStart}' AND TKB.namkt = '${yearEnd}'`
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listSchedule = [];

        for (let i = 0; i < result.length; i++) {
          const scheduleOnDB = result[i];
          const subjectID = scheduleOnDB.mabm;
          const teacherID = scheduleOnDB.magv;
          const dayInWeek = scheduleOnDB.ngaytrongtuan;
          const start = scheduleOnDB.tietbd;
          const period = scheduleOnDB.tiet;

          listSchedule.push({
            subjectID,
            teacherID,
            dayInWeek,
            start,
            period,
          });
        }
        return listSchedule;
      }
      return null;
    }
  }

  static async getScheduleExam(id, semesterID, yearStart, yearEnd) {
    if (id) {
      if (typeof semesterID === "undefined") {
        const lastestSemester = await semesterID.getLastestSemester();
        semesterID = lastestSemester.getSemesterID();
        yearStart = lastestSemester.getYearStart();
        yearEnd = lastestSemester.getYearEnd();
      }
      const sqlQuery = 
        `SELECT * ` +
        `FROM PHONGTHI AS PT, LICHTHI AS LT ` +
        `WHERE PT.mahs ='${id}' AND PT.maphongthi = LT.maphongthi AND LT.mahk = '${semesterID}' AND LT.nambd = '${yearStart}' AND LT.namkt = '${yearEnd}'`
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listExamSchedule = [];

        for (let i = 0; i < result.length; i++) {
          const examScheduleOnDB = result[i];

          const roomID = examScheduleOnDB.maphong;
          const subjectID = examScheduleOnDB.mabm;
          const date = examScheduleOnDB.ngaythi;
          const start = examScheduleOnDB.tietbd;

          listExamSchedule.push({
            roomID,
            subjectID,
            date,
            start
          });
        }
        return listExamSchedule;
      }
      return null;
    }
  }

  static async getScore(id, semesterID, yearStart, yearEnd) {
    if (id) {
      if (typeof semesterID === "undefined") {
        const lastestSemester = await semesterID.getLastestSemester();
        semesterID = lastestSemester.getSemesterID();
        yearStart = lastestSemester.getYearStart();
        yearEnd = lastestSemester.getYearEnd();
      }
      const sqlQuery = 
        `SELECT * ` +
        `FROM DIEM AS D ` +
        `WHERE D.mahs ='${id}' AND D.mahk = '${semesterID}' AND D.nambd = '${yearStart}' AND D.namkt = '${yearEnd}'`
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listScore = [];

        for (let i = 0; i < result.length; i++) {
          const scoreOnDB = result[i];

          const studentID = scoreOnDB.mahs;
          const subjectID = scoreOnDB.mabm;
          const score1 = scoreOnDB.cot1;
          const score2 = scoreOnDB.cot2;
          const score3 = scoreOnDB.cot3;
          const score4 = scoreOnDB.cot4;

          listScore.push({
            studentID,
            subjectID,
            score1,
            score2,
            score3,
            score4
          });
        }
        return listScore;
      }
      return null;
    }
  }

  static async getReExamination(id) {
    if (id) {
      const sqlQuery = 
        `SELECT * ` +
        `FROM PHUCKHAO AS PK ` +
        `WHERE PK.mahs ='${id}'`
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listReExamination = [];

        for (let i = 0; i < result.length; i++) {
          const reExaminationOnDB = result[i];

          const subjectID = reExaminationOnDB.mabm;
          const semesterID = reExaminationOnDB.mahk;
          const yearStart = reExaminationOnDB.nambd;
          const yearEnd = reExaminationOnDB.namkt;
          const substance = reExaminationOnDB.noidung;
          const status = reExaminationOnDB.trangthai;

          listReExamination.push({
            subjectID,
            semesterID,
            yearStart,
            yearEnd,
            substance,
            status
          });
        }
        return listReExamination;
      }
      return null;
    }
  }




  static async Find({ id, classID }) {
    if (id) {
      const sqlQuery =
        `SELECT * ` +
        `FROM HOCSINH AS HS INNER JOIN NGUOIDUNG AS ND ON HS.mahs = ND.tenDangNhap ` +
        `WHERE HS.mahs='${id}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const studentOnDB = result[0];

        const id = studentOnDB.mahs;
        const username = studentOnDB.mahs;
        const password = studentOnDB.matkhau;
        const dob = new Date(studentOnDB.ngaysinh);
        const identityCard = studentOnDB.cmnd;
        const fullName = studentOnDB.hoten;
        const address = studentOnDB.diachi;
        const classID = studentOnDB.malop;
        const status = studentOnDB.status;

        return new Student(
          id,
          username,
          password,
          identityCard,
          fullName,
          dob,
          address,
          status,
          classID
        );
      }

      return null;
    }

    if (classID) {
      const sqlQuery =
        `SELECT * ` +
        `FROM HOCSINH AS HS INNER JOIN NGUOIDUNG AS ND ON HS.mahs = ND.tenDangNhap ` +
        `WHERE HS.malop='${classID}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listStudents = [];

        for (let i = 0; i < result.length; i++) {
          const studentOnDB = result[i];

          const id = studentOnDB.mahs;
          const username = studentOnDB.mahs;
          const password = studentOnDB[0].matKhau;
          const dob = new Date(studentOnDB.ngaysinh);
          const identityCard = studentOnDB.cmnd;
          const fullName = studentOnDB.hoten;
          const address = studentOnDB.diachi;
          const classID = studentOnDB.malop;
          const status = studentOnDB.status;

          listStudents.push(
            new Student(
              id,
              username,
              password,
              identityCard,
              fullName,
              dob,
              address,
              status,
              classID
            )
          );
        }

        return listStudents;
      }

      return null;
    }
  }

  static async Save(student) {
    const isExist = await checkExist(
      "NGUOIDUNG",
      "tenDangNhap",
      student.getUserName()
    );

    const dobFormat = `${student.dob.getFullYear()}-${
      student.dob.getMonth() + 1
    }-${student.dob.getDate()}`;

    if (isExist) {
      //update

      //1. update NGUOIDUNG
      const sqlQuery1 =
        `UPDATE NGUOIDUNG ` +
        `SET matKhau="${student.getPassWord()}", cmnd='${student.getIdentityCard()}' ` +
        `WHERE tenDangNhap='${student.getID()}'`;
      await ExecuteSQL(sqlQuery1);

      //2. update HOCSINH
      const sqlQuery2 =
        `UPDATE HOCSINH ` +
        `SET ngaySinh="${dobFormat}", ` +
        `hoten="${student.getFullName()}", ` +
        `diachi="${student.getAddress()}", ` +
        `trangthai=${student.getStatus()} ` +
        `WHERE mahs="${student.getID()}"`;

      await ExecuteSQL(sqlQuery2);
      return flagClass.DB.UPDATE;
    }

    //insert

    //1. Insert NGUOIDUNG
    const sqlQuery1 =
      `INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, cmnd, loai) ` +
      `VALUES ('${student.getUserName()}', '${student.getPassWord()}', '${student.getIdentityCard()}', ${
        flagClass.TYPE_USER.STUDENT
      })`;

    await ExecuteSQL(sqlQuery1);

    //2. Insert HOCSINH
    const sqlQuery2 =
      `INSERT INTO HOCSINH (mahs, ngaysinh, hoten, diachi, malop, trangthai) ` +
      `VALUES ('${student.getID()}', '${dobFormat}', '${student.getFullName()}', '${student.getAddress()}', '${student.getClassID()}', ${student.getStatus()})`;

    await ExecuteSQL(sqlQuery2);

    return flagClass.DB.NEW;
  }
};

// async function exec() {
//   const sqlQuery = `SELECT * FROM HOCSINH AS HS inner join NGUOIDUNG AS ND on HS.mahs = ND.tenDangNhap`;
//   const result = await ExecuteSQL(sqlQuery);

//   console.log(result);

//   const result = await Student.Find({ id: "HS03", classID: null });

//   console.log(new Date(result.ngaysinh).getFullYear());
// }
// exec();

module.exports = Student;
