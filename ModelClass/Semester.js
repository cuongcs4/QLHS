//// Sơ đò lớp của Semester

const Semester = class {
  constructor(semesterID, yearStart, yearEnd, status) {
    this.semesterID = semesterID || null;
    this.yearStart = yearStart || null;
    this.yearEnd = yearEnd || null;
    this.status = status || null;
  }

  getSemesterID() {}

  getYearStart() {}

  getYearEnd() {}

  getStatus() {}

  setStatus() {}

  static find() {}

  static save() {}
};

module.exports = Semester;
