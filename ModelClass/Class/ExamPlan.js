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

  getSemester() {
    return this.semester;
  }

  getRoomExamID() {
    return this.roomID;
  }
  setRoomExamID(newRoomExamID) {
    this.roomID = newRoomExamID;
  }

  getSubjectID() {
    return this.subjectID;
  }
  setSubjectID(newSubjectID) {
    this.subjectID = newSubjectID;
  }

  getDayExam() {
    return this.dayExam;
  }
  setDayExam(newDayExam) {
    this.dayExam = newDayExam;
  }

  getStartSection() {
    return this.startSection;
  }
  setStartSection(newStartSection) {
    this.startSection = newStartSection;
  }

  getSupervisorID1() {
    return this.supervisorID1;
  }
  setSupervisorID1(newSupervisorID) {
    this.supervisorID1 = newSupervisorID;
  }

  getSupervisor2ID() {
    return this.supervisorID2;
  }
  setSupervisor2ID(newSupervisorID) {
    this.supervisorID2 = newSupervisorID;
  }

  static async Find() {
    const sqlQuery = `SELECT * ` + `FROM LICHTHI ` + `WHERE `;
  }

  static save() {}
};

module.exports = ExamPlan;
