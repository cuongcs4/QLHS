//Sơ đồ lớp của Score

const Semester = require("./Semester");

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

  static find() {}

  static save() {}
};

module.exports = Score;
