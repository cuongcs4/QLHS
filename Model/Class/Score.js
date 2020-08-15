//Sơ đồ lớp của Score

const ExecuteSQL = require("../Database/ExecuteSQL");

const flagClass = require("../Helper/resource/Flag");

const TeachingPlan = require("./TeachingPlan");
const Semester = require("./Semester");

const Score = class {
  constructor(
    semester,
    studentID,
    classID,
    subjectID,
    score1,
    score2,
    score3,
    score4
  ) {
    this.semester = semester;
    this.studentID = studentID;
    this.classID = classID;
    this.subjectID = subjectID;
    this.score1 = score1;
    this.score2 = score2;
    this.score3 = score3;
    this.score4 = score4;
  }

  getSemester() {
    return this.semester;
  }

  getStudentID() {
    return this.studentID;
  }

  getClassID() {
    return this.classID;
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
    if (typeof semesterID === "undefined") {
      const latestSemester = await Semester.getLatestSemester();

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
        `SELECT DI.mahs AS studentID, DI.malop AS classID, DI.mabm AS subjectID, BM.tenbm AS subjectName, ` +
        `DI.cot1 AS score1, DI.cot2 AS score2, DI.cot3 AS score3, DI.cot4 AS score4, ` +
        `DI.mahk AS semesterID, DI.nambd AS yearStart, DI.namkt AS yearEnd ` +
        `FROM DIEM AS DI INNER JOIN BOMON AS BM ON BM.mabm = DI.mabm ` +
        `WHERE DI.mahs='${studentID}' AND DI.mahk=${semesterID} AND DI.nambd=${yearStart} AND DI.namkt=${yearEnd}`;

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
  static async Insert(score) {
    const {
      semester,
      studentID,
      classID,
      subjectID,
      score1,
      score2,
      score3,
      score4,
    } = score;

    const { semesterID, yearStart, yearEnd } = semester;

    const sqlQuery =
      `INSERT INTO DIEM(mahs, malop, mabm, mahk, nambd, namkt, cot1, cot2, cot3, cot4) ` +
      `VALUES ('${studentID}', '${classID}', '${subjectID}', ` +
      `${semesterID}, ${yearStart}, ${yearEnd}, ${score1}, ` +
      `${score2}, ${score3}, ${score4})`;

    //console.log(sqlQuery);
    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }

  static async Save(score) {
    const { semesterID, yearStart, yearEnd } = score.getSemester();
    const { studentID, subjectID, score1, score2, score3, score4 } = score;

    const sqlQuery =
      `UPDATE DIEM ` +
      `SET cot1=${score1}, cot2=${score2}, cot3=${score3}, cot4=${score4} ` +
      `WHERE mahs='${studentID}' AND mabm='${subjectID}' ` +
      `AND mahk=${semesterID} AND nambd=${yearStart} AND namkt=${yearEnd}`;

    //console.log(sqlQuery);
    await ExecuteSQL(sqlQuery);

    return flagClass.DB.UPDATE;
  }
};

// const exec = async () => {
//   const lastSemester = await Semester.getLatestSemester();
//     if (lastSemester.semesterID === 1) {
//       lastSemester.semesterID = 2;
//     }
//     else {
//       lastSemester.semesterID = 1;
//       lastSemester.yearStart += 1;
//       lastSemester.yearEnd += 1;
//     }
//     //console.log(lastSemester)
//     const newSemester = new Semester(
//       lastSemester.semesterID,
//       lastSemester.yearStart,
//       lastSemester.yearEnd,
//       1
//     )
//   const score = new Score(newSemester,"HS20180101", "GV01", "LH201801","Toan");
//   const isExist = (await Score.Find(
//     {  studentID: score.getStudentID(),
//        classID: score.getClassID(),
//        subjectID: score.getSubjectID()
//       },
//     score.getSemester().getSemesterID(),
//     score.getSemester().getYearStart(),
//     score.getSemester().getYearEnd()
//   )) !== null
//     ? true
//     : false;
//     //console.log(isExist);
//   if (isExist === false) {
//   const sqlQuery =
//       `INSERT INTO DIEM (mahs, malop, mabm, mahk, nambd, namkt, cot1, cot2, cot3, cot4) ` +
//       `VALUES ('${score.getStudentID()}', '${score.getClassID()}', '${score.getSubjectID()}', ` +
//       `'${newSemester.getSemesterID()}', '${newSemester.getYearStart()}', '${newSemester.getYearEnd()}', ` +
//       `'${score.getScore1()}', '${score.getScore2()}', '${score.getScore3()}', '${score.getScore4()}')`;
//     //console.log(sqlQuery);
//     await ExecuteSQL(sqlQuery);

//     return flagClass.DB.NEW;
//   }
// };
// exec();

module.exports = Score;
