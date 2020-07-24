//Sơ đồ lớp của TeachingPlan

const Semester = require("./Semester");

const TeachingPlan = class {
  constructor(
    semester,
    teacherID,
    subjectID,
    classID,
    dayInWeek,
    startSection
  ) {
    this.semester = semester || null;
    this.teacherID = teacherID || null;
    this.subjectID = subjectID || null;
    this.classID = classID || null;
    this.dayInWeek = dayInWeek || null;
    this.startSection = startSection || null;
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
  static async Find() {}

  static save() {}
};

module.exports = TeachingPlan;
