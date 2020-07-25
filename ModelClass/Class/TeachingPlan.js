//Sơ đồ lớp của TeachingPlan

const Semester = require("./Semester");

const TeachingPlan = class {
  constructor(
    semester,
    teacherID,
    subjectID,
    classID,
    dayInWeek,
    startSection,
    totalSection
  ) {
    this.semester = semester || null;
    this.teacherID = teacherID || null;
    this.subjectID = subjectID || null;
    this.classID = classID || null;
    this.dayInWeek = dayInWeek || null;
    this.startSection = startSection || null;
    this.totalSection = totalSection || null;
  }

  getSemester() {}

  getTeacherID() {
    return this.teacherID;
  }
  setTeacherID(newTeacherID) {
    this.teacherID = newTeacherID;
  }

  getSubjectID() {
    return this.subjectID;
  }
  setSubjectID(newSubjectID) {
    this.subjectID = newSubjectID;
  }

  getClassID() {
    return this.classID;
  }
  setClassID(newClassID) {
    this.classID = newClassID;
  }

  getDayInWeek() {
    return this.dayInWeek;
  }
  setDayInWeek(newDayInWeek) {
    this.dayInWeek = newDayInWeek;
  }

  getStartSection() {
    return this.startSection;
  }
  setStartSection(newStartSection) {
    this.startSection = newStartSection;
  }

  //Tìm kiếm thời khóa biểu theo lớp học, học kỳ

  static async Find({ classID, teacherID }, semesterID, yearStart, yearEnd) {
    if (typeof semesterID === "undefined") {
      const lastestSemester = await semesterID.getLastestSemester();
      semesterID = lastestSemester.getSemesterID();
      yearStart = lastestSemester.getYearStart();
      yearEnd = lastestSemester.getYearEnd();
    }
    if (classID !== null) {
      // Lấy TKB của học sinh theo mã lớp
      const sqlQuery =
        `SELECT TKB.magv AS teacherID, TKB.mabm AS subjectID, TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection ` +
        `FROM THOIKHOABIEU AS TKB ` +
        `WHERE TKB.malop ='${classID}' AND TKB.mahk = '${semesterID}' AND TKB.nambd = '${yearStart}' AND TKB.namkt = '${yearEnd}'`;
      const result = await ExecuteSQL(sqlQuery);
      return result.length === 0 ? null : result;
    }
    if (teacherID !== null) {
      // Lấy TKB của giáo viên
      const sqlQuery =
        `SELECT TKB.malop AS classID, TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection ` +
        `FROM THOIKHOABIEU AS TKB ` +
        `WHERE TKB.magv ='${teacherID}' AND TKB.mahk = '${semesterID}' AND TKB.nambd = '${yearStart}' AND TKB.namkt = '${yearEnd}'`;
      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? null : result;
    }
  }

  static save() {}
};

module.exports = TeachingPlan;
