//Sơ đồ lớp của Conduct

const Semester = require("./Semester");

const Conduct = class {
  constructor(semester, studentID, grade) {
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.grade = grade || null;
  }

  getSemester() {}

  getStudent() {}

  getGrade() {}
  setGrade() {}

  static find() {}

  static save() {}
};

module.exports = Conduct;
