//Sơ đồ lớp của ResultSurvey

const Semester = require("./Semester");
const ExecuteSQL = require("../Database/ExecuteSQL");

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
      `SELECT * ` +
      `FROM KQKHAOSAT AS KQKS ` +
      `WHERE KQKS.mahk=${semesterID} AND KQKS.mahk=${yearStart} AND KQKS.mahk=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    return result.length === 0 ? null : result;
  }

  static async Save(resultSurvey) {}
};

module.exports = ResultSurvey;
