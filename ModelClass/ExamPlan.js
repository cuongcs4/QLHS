//Sơ đồ lớp của ExamPlan

const Semester = require("./Semester");

const ExamPlan = class {
  constructor(
    semester,
    roomID,
    subjectID,
    dayExam,
    startSection,
    supervisorID1,
    supervisorID2
  ) {
    this.semester = semester || null;
    this.roomID = roomID || null;
    this.subjectID = subjectID || null;
    this.dayExam = dayExam || null;
    this.startSection = startSection || null;
    this.supervisorID1 = supervisorID1 || null;
    this.supervisorID2 = supervisorID2 || null;
  }

  getSemester() {}

  getRoomExam() {}
  setRoomExam() {}

  getSubject() {}
  setSubject() {}

  getDayExam() {}
  setDayExam() {}

  getStartSection() {}
  setStartSection() {}

  getSupervisor1() {}
  setSupervisor1() {}

  getSupervisor2() {}
  setSupervisor2() {}

  static find() {}

  static save() {}
};

module.exports = ExamPlan;
