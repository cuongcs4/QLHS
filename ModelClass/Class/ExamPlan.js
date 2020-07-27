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

  //Tìm kiếm lịch thi theo khối, học kỳ.
  static async Find({ studentID, teacherID }, semesterID, yearStart, yearEnd) {
    if (typeof semesterID === "undefined") {
      const lastestSemester = await semesterID.getLastestSemester();
      semesterID = lastestSemester.getSemesterID();
      yearStart = lastestSemester.getYearStart();
      yearEnd = lastestSemester.getYearEnd();
    }
    if (studentID !== null) {
      // Lấy lịch thi của học sinh theo mã hs
      const sqlQuery =
        `SELECT LT.mabm AS subjectID, LT.ngaythi AS dayExam, LT.maphong AS roomID, LT.tietbd AS startSection ` +
        `FROM LICHTHI AS LT INNER JOIN PHONGTHI AS PT ON LT.maphong = PT.maphongthi ` +
        `WHERE PT.mahs = '${studentID}' AND PT.mahk = '${semesterID}' AND PT.nambd = '${yearStart}' AND PT.namkt = '${yearEnd}'`;
      const result = await ExecuteSQL(sqlQuery);
      return result.length === 0 ? null : result;
    }
    if (teacherID !== null) {
       // Lấy TKB của giáo viên
       const sqlQuery =
       `SELECT LT.mabm AS subjectID, LT.ngaythi AS dayExam, LT.maphong AS roomID, LT.tietbd AS startSection, ` +
       `LT.giamthi1 AS supervisorID1, LT.giamthi2 AS supervisorID2 ` +
       `FROM LICHTHI AS LT ` +
       `WHERE (LT.giamthi1 = '${teacherID}' OR LT.giamthi2 = '${teacherID}') ` +
       `AND PT.mahk = '${semesterID}' AND PT.nambd = '${yearStart}' AND PT.namkt = '${yearEnd}'`;
     const result = await ExecuteSQL(sqlQuery);
     
     return result.length === 0 ? null : result;
    }
  }

  static save() {}
};

module.exports = ExamPlan;
