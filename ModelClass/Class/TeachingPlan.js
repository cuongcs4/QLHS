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

  getTeacher() {}
  setTeacher() {}

  getSubject() {}
  setSubject() {}

  getClass() {}
  setClass() {}

  getDayInWeek() {}
  setDayInWeek() {}

  getStartSection() {}
  setStartSection() {}

  static find() {}

  static save() {}
};

module.exports = TeachingPlan;
