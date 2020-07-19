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

  getStudent() {}

  getTeacher() {}

  getSubject() {}

  getScore1() {}

  getScore2() {}

  getScore3() {}

  getScore4() {}

  static find() {}

  static save() {}
};

module.exports = Score;
