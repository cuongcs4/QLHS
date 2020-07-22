//Sơ đồ lớp của Conduct

const Semester = require("./Semester");

const Conduct = class {
  constructor(semester, studentID, grade) {
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.grade = grade || null;
  }

  getSemester() {}

  getStudentID() {
    return this.studentID;
  }

  getGrade() {
    return this.grade;
  }
  setGrade(newGrade) {
    this.grade = newGrade;
  }

  static find() {}

  static save() {}
};

module.exports = Conduct;
