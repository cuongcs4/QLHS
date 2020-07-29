// Sơ đò lớp của Student kế thừa từ User.

const User = require("./User");
const Semester = require("./Semester");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");
const Score = require("./Score");
const TeachingPlan = require("./TeachingPlan");
const Conduct = require("./Conduct");
const Class = require("./Class");

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

  async getClassName() {
    return await Class.GetClassName(this.classID);
  }

  // static async getSchedule(classID, semesterID, yearStart, yearEnd) {
  //   if (classID) {
  //     if (typeof semesterID === "undefined") {
  //       const lastestSemester = await semesterID.getLastestSemester();
  //       semesterID = lastestSemester.getSemesterID();
  //       yearStart = lastestSemester.getYearStart();
  //       yearEnd = lastestSemester.getYearEnd();
  //     }
  //     const sqlQuery =
  //       `SELECT * ` +
  //       `FROM THOIKHOABIEU AS TKB ` +
  //       `WHERE TKB.malop ='${classID}' AND TKB.mahk = '${semesterID}' AND TKB.nambd = '${yearStart}' AND TKB.namkt = '${yearEnd}'`;
  //     const result = await ExecuteSQL(sqlQuery);

  //     if (result.length !== 0) {
  //       const listSchedule = [];

  async getSchedule(semesterID, yearStart, yearEnd) {
    const schedule = await TeachingPlan.Find(
      { classID: this.classID, teacherID: null },
      semesterID,
      yearStart,
      yearEnd
    );
    return schedule;
  }
  async getExamSchedule(semesterID, yearStart, yearEnd) {
    const schedule = await ExamPlan.Find(
      { studentID: this.id, teacherID: null },
      semesterID,
      yearStart,
      yearEnd
    );

    return schedule;
  }

  static async getReExamination(id) {
    if (id) {
      const sqlQuery =
        `SELECT * ` + `FROM PHUCKHAO AS PK ` + `WHERE PK.mahs ='${id}'`;
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
            status,
          });
        }
        return listReExamination;
      }
      return null;
    }
  }

  async getScore(semesterID, yearStart, yearEnd) {
    const scores = await Score.Find(
      { studentID: this.id, classID: null, subjectID: null },
      semesterID,
      yearStart,
      yearEnd
    );

    return scores;
  }

  async getConduct(semesterID, yearStart, yearEnd) {
    const result = await Conduct.Find(
      { studentID: this.id, classID: null },
      semesterID,
      yearStart,
      yearEnd
    );

    return result === null ? null : result.grade;
  }

  async getGPA(semesterID, yearStart, yearEnd) {
    const scores = await this.getScore(semesterID, yearStart, yearEnd);

    let GPA = 0;

    if (scores === null) return GPA;

    for (let i = 0; i < scores.length; i++) {
      const score = scores[i];

      if (score.subjectID !== "TheDuc") {
        GPA +=
          (score.score1 + score.score2 + 2 * score.score3 + 3 * score.score4) /
          7;
      }
    }

    GPA /= scores.length - 1;

    return GPA;
  }

  async classifyAverageScore(semesterID, yearStart, yearEnd) {
    const scoreAverage = await this.getGPA(semesterID, yearStart, yearEnd);
    const scores = await this.getScore(semesterID, yearStart, yearEnd);

    if (scores === null) return flagClass.SCORE.TYPE_5;

    const listGpaSubject = [];
    for (let i = 0; i < scores.length; i++) {
      const gpaSubject =
        (scores[i].score1 +
          scores[i].score2 +
          scores[i].score3 * 2 +
          scores[i].score4 * 3) /
        7;

      listGpaSubject.push(gpaSubject);
    }

    const scoreMath = await Score.Find(
      { studentID: this.id, subjectID: "Toan", classID: null },
      semesterID,
      yearStart,
      yearEnd
    );

    const gpaMath =
      (scoreMath.score1 +
        scoreMath.score2 +
        scoreMath.score3 * 2 +
        scoreMath.score4 * 3) /
      7;

    const scoreLiterature = await Score.Find(
      { studentID: this.id, subjectID: "NguVan", classID: null },
      semesterID,
      yearStart,
      yearEnd
    );
    const gpaLiterature =
      (scoreLiterature.score1 +
        scoreLiterature.score2 +
        scoreLiterature.score3 * 2 +
        scoreLiterature.score4 * 3) /
      7;

    //Loại giói (DTB các môn học >= 6.5, gpa >= 8.0, toán or văn >= 8.0)
    if (scoreAverage >= 8.0) {
      if (gpaMath >= 8.0 || gpaLiterature >= 8.0) {
        let isTrue = true;
        for (let i = 0; i < listGpaSubject.length; i++) {
          if (listGpaSubject[i] < 6.5) {
            isTrue = false;
            break;
          }
        }
        if (isTrue) return flagClass.SCORE.TYPE_1;
      }
    }

    //Loại khá
    if (scoreAverage >= 6.5) {
      if (gpaMath >= 6.5 || gpaLiterature >= 6.5) {
        let isTrue = true;
        for (let i = 0; i < listGpaSubject.length; i++) {
          if (listGpaSubject[i] < 5.0) {
            isTrue = false;
            break;
          }
        }
        if (isTrue) return flagClass.SCORE.TYPE_2;
      }
    }

    //Loại trung bình
    if (scoreAverage >= 5.0) {
      if (gpaMath >= 5.0 || gpaLiterature >= 5.0) {
        let isTrue = true;
        for (let i = 0; i < listGpaSubject.length; i++) {
          if (listGpaSubject[i] < 3.5) {
            isTrue = false;
            break;
          }
        }
        if (isTrue) return flagClass.SCORE.TYPE_3;
      }
    }

    //Loại yếu (Điểm các môn học > 2.0 và gpa >= 3.5)
    if (scoreAverage >= 3.5) {
      let isTrue = true;
      for (let i = 0; i < listGpaSubject.length; i++) {
        if (listGpaSubject[i] < 2.0) {
          isTrue = false;
          break;
        }
      }
      if (isTrue) return flagClass.SCORE.TYPE_4;
    }

    return flagClass.SCORE.TYPE_5;
    //Loại kém
  }

  static async Find({ id, classID }) {
    // tìm tất cả học sinh
    if (id === null && classID === null) {
      const sqlQuery =
        `SELECT * ` +
        `FROM HOCSINH AS HS INNER JOIN NGUOIDUNG AS ND ON HS.mahs = ND.tenDangNhap`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listStudents = [];

        for (let i = 0; i < result.length; i++) {
          const studentOnDB = result[i];

          const id = studentOnDB.mahs;
          const username = studentOnDB.mahs;
          const password = studentOnDB.matKhau;
          const dob = new Date(studentOnDB.ngaysinh);
          const identityCard = studentOnDB.cmnd;
          const fullName = studentOnDB.hoten;
          const address = studentOnDB.diachi;
          const classID = studentOnDB.malop;
          const status = studentOnDB.trangthai;
          const typeUser = flagClass.TYPE_USER.STUDENT;

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
              typeUser,
              classID
            )
          );
        }

        return listStudents;
      }
      return null;
    }

    // tìm học sinh theo mã hs
    if (id !== null) {
      const sqlQuery =
        `SELECT * ` +
        `FROM HOCSINH AS HS INNER JOIN NGUOIDUNG AS ND ON HS.mahs = ND.tenDangNhap ` +
        `WHERE HS.mahs='${id}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const studentOnDB = result[0];

        const id = studentOnDB.mahs;
        const username = studentOnDB.mahs;
        const password = studentOnDB.matKhau;
        const dob = new Date(studentOnDB.ngaysinh);
        const identityCard = studentOnDB.cmnd;
        const fullName = studentOnDB.hoten;
        const address = studentOnDB.diachi;
        const classID = studentOnDB.malop;
        const status = studentOnDB.trangthai;
        const typeUser = flagClass.TYPE_USER.STUDENT;

        return new Student(
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
        );
      }

      return null;
    }

    // tìm danh sách học sinh của lớp
    if (classID !== null) {
      const sqlQuery =
        `SELECT * ` +
        `FROM HOCSINH AS HS INNER JOIN NGUOIDUNG AS ND ON HS.mahs = ND.tenDangNhap ` +
        `WHERE HS.malop='${classID}'`;
      console.log(sqlQuery);
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listStudents = [];

        for (let i = 0; i < result.length; i++) {
          const studentOnDB = result[i];

          const id = studentOnDB.mahs;
          const username = studentOnDB.mahs;
          const password = studentOnDB.matKhau;
          const dob = new Date(studentOnDB.ngaysinh);
          const identityCard = studentOnDB.cmnd;
          const fullName = studentOnDB.hoten;
          const address = studentOnDB.diachi;
          const classID = studentOnDB.malop;
          const status = studentOnDB.trangthai;
          const typeUser = flagClass.TYPE_USER.STUDENT;

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
              typeUser,
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

// const exec = async () => {
//   const result = await Student.Find({ id: "HS20180102", classID: null });
//   console.log(result);
// };
// exec();

module.exports = Student;
