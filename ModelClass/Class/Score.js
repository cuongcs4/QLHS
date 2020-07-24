//Sơ đồ lớp của Score

const Semester = require("./Semester");
const ExecuteSQL = require("../Database/ExecuteSQL");

const Score = class {
  constructor(
    semester,
    studentID,
    teacherID,
    subjectID,
    score1,
    score2,
    score3,
    score4
  ) {
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.teacherID = teacherID || null;
    this.subjectID = subjectID || null;
    this.score1 = score1 || null;
    this.score2 = score2 || null;
    this.score3 = score3 || null;
    this.score4 = score4 || null;
  }

  getSemester() {}

  getStudentID() {
    return this.studentID;
  }

  getTeacherID() {
    return this.teacherID;
  }

  getSubjectID() {
    return this.subjectID;
  }

  getScore1() {
    return this.score1;
  }

  getScore2() {
    return this.score2;
  }

  getScore3() {
    return this.score3;
  }

  getScore4() {
    return this.score4;
  }

  getGPA() {
    return (this.score1 + this.score2 + 2 * this.score3 + 3 * this.score4) / 7;
  }

  static async Find(
    { studentID, classID, subjectID },
    semesterID,
    yearStart,
    yearEnd
  ) {
    if (typeof semesterID == "undefined") {
      const latestSemester = await Semester.GetLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    if (studentID !== null) {
      //Lấy điểm theo mã học sinh và mã môn học
      if (subjectID !== null) {
        const sqlQuery =
          `SELECT DI.mahs AS studentID, DI.malop AS classID, DI.mabm AS subjectID, ` +
          `DI.cot1 AS score1, DI.cot2 AS score2, DI.cot3 AS score3, DI.cot4 AS score4, ` +
          `HK.mahk AS semesterID, HK.nambd AS yearStart, HK.namkt AS yearEnd ` +
          `FROM DIEM AS DI INNER JOIN HOCKY AS HK ON DI.mahk=HK.mahk AND DI.nambd=HK.nambd AND DI.namkt=HK.namkt ` +
          `WHERE DI.mahs='${studentID}' AND DI.mabm='${subjectID}' AND HK.mahk=${semesterID} AND HK.nambd=${yearStart} AND HK.namkt=${yearEnd}`;

        const result = await ExecuteSQL(sqlQuery);
        return result.length === 0 ? null : result[0];
      }

      //Lấy danh sách điểm của một học sinh theo học kỳ.
      const sqlQuery =
        `SELECT DI.mahs AS studentID, DI.malop AS classID, DI.mabm AS subjectID, ` +
        `DI.cot1 AS score1, DI.cot2 AS score2, DI.cot3 AS score3, DI.cot4 AS score4, ` +
        `HK.mahk AS semesterID, HK.nambd AS yearStart, HK.namkt AS yearEnd ` +
        `FROM DIEM AS DI INNER JOIN HOCKY AS HK ON DI.mahk=HK.mahk AND DI.nambd=HK.nambd AND DI.namkt=HK.namkt ` +
        `WHERE DI.mahs='${studentID}' AND HK.mahk=${semesterID} AND HK.nambd=${yearStart} AND HK.namkt=${yearEnd}`;

      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? null : result;
    }

    if (classID !== null) {
      //Lấy danh sách điểm theo mã lớp và mã môn học
      if (subjectID !== null) {
        const sqlQuery =
          `SELECT DI.mahs AS studentID, DI.malop AS classID, DI.mabm AS subjectID, ` +
          `DI.cot1 AS score1, DI.cot2 AS score2, DI.cot3 AS score3, DI.cot4 AS score4, ` +
          `HK.mahk AS semesterID, HK.nambd AS yearStart, HK.namkt AS yearEnd ` +
          `FROM DIEM AS DI INNER JOIN HOCKY AS HK ON DI.mahk=HK.mahk AND DI.nambd=HK.nambd AND DI.namkt=HK.namkt ` +
          `WHERE DI.malop='${classID}' AND DI.mabm='${subjectID}' AND HK.mahk=${semesterID} AND HK.nambd=${yearStart} AND HK.namkt=${yearEnd}`;

        const result = await ExecuteSQL(sqlQuery);

        return result.length === 0 ? null : result;
      }

      //Lấy danh sách điểm theo lớp học
      const sqlQuery =
        `SELECT DI.mahs AS studentID, DI.malop AS classID, DI.mabm AS subjectID, ` +
        `DI.cot1 AS score1, DI.cot2 AS score2, DI.cot3 AS score3, DI.cot4 AS score4, ` +
        `HK.mahk AS semesterID, HK.nambd AS yearStart, HK.namkt AS yearEnd ` +
        `FROM DIEM AS DI INNER JOIN HOCKY AS HK ON DI.mahk=HK.mahk AND DI.nambd=HK.nambd AND DI.namkt=HK.namkt ` +
        `WHERE DI.malop='${classID}' AND HK.mahk=${semesterID} AND HK.nambd=${yearStart} AND HK.namkt=${yearEnd}`;

      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? null : result;
    }
  }

  static async Save() {}
};

// const exec = async () => {
//   const result = await Score.Find(
//     {
//       studentID: null,
//       classID: "LH201901",
//       subjectID: "Toan",
//     },
//     1,
//     2019,
//     2020
//   );

//   console.log(result);
// };

// exec();

module.exports = Score;
