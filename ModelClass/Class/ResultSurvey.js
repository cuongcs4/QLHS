//Sơ đồ lớp của ResultSurvey

const Semester = require("./Semester");

const ExecuteSQL = require("../Database/ExecuteSQL");
const flagClass = require("../Helper/resource/Flag");

const ResultSurvey = class {
  constructor(semester, studentID, teacherID, subjectID, questionID, answer) {
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.teacherID = teacherID || null;
    this.subjectID = subjectID || null;
    this.questionID = questionID || null;
    this.answer = answer || null;
  }

  getSemester() {
    return this.semester;
  }

  getStudentID() {
    return this.studentID;
  }

  getTeacherID() {
    return this.teacherID;
  }

  getSubjectID() {
    return this.subjectID;
  }

  getQuestionID() {
    return this.questionID;
  }

  getAnswer() {
    return this.answer;
  }

  static async Find(semesterID, yearStart, yearEnd) {
    if (typeof semesterID == "undefined") {
      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    const sqlQuery =
      `SELECT macauhoi AS idQuestion, mahs AS studentID, cautl AS answer ` +
      `FROM KQKHAOSAT AS KQKS ` +
      `WHERE KQKS.mahk=${semesterID} AND KQKS.nambd=${yearStart} AND KQKS.namkt=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    return result.length === 0 ? null : result;
  }

  static async Save(resultSurvey) {
    const semester = resultSurvey.semester;
    const sqlQuery =
      `INSERT INTO KQKHAOSAT(macauhoi,mahs,mahk,nambd,namkt,cautl) ` +
      `VALUES ('${resultSurvey.getQuestionID()}','${resultSurvey.getStudentID()}' ,'${
        semester.getSemesterID()
      }','${semester.getYearStart()}','${
        semester.getYearEnd()
      }','${resultSurvey.getAnswer()}')`;
    await ExecuteSQL(sqlQuery);
  }

  static async CountStudentDoSurvey(semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT * ` +
      `FROM KQKHAOSAT ` +
      `WHERE mahk=${semesterID} AND nambd=${yearStart} AND namkt=${yearEnd} ` +
      `GROUP BY mahs`;

    const result = await ExecuteSQL(sqlQuery);

    return result.length;
  }

  static async GetTimeSurvey(semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT DKS.mahk AS semesterID, DKS.nambd AS yearStart, DKS.namkt AS yearEnd, ` +
      `DKS.ngaybd AS dayStart, DKS.ngaykt AS dayEnd ` +
      `FROM DOTKS AS DKS ` +
      `WHERE DKS.mahk=${semesterID} AND DKS.nambd=${yearStart} AND DKS.namkt=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    return result.length === 0 ? null : result[0];
  }

  static async CreateSurvey(semesterID, yearStart, yearEnd, dayStart, dayEnd) {
    const sqlQuery =
      `INSERT INTO DOTKS(mahk, nambd, namkt, ngaybd, ngaykt) ` +
      `VALUES (${semesterID},${yearStart},${yearEnd},'${dayStart}','${dayEnd}') `;

    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }
};

module.exports = ResultSurvey;
