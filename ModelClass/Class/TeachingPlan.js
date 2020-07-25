//Sơ đồ lớp của TeachingPlan

const Semester = require("./Semester");
const ExecuteSQL = require("../Database/ExecuteSQL");
const flagClass = require("../MiniServices/Flag");
const checkExist = require("../MiniServices/checkExist");

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

  getSemester() {
    return this.semester;
  }

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
      const latestSemester = await semesterID.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
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

  static async Save(teachingPlan) {
    const semesterID = teachingPlan.getSemester().getSemesterID();
    const yearStart = teachingPlan.getSemester().getYearStart();
    const yearEnd = teachingPlan.getSemester().getYearEnd();
    const teacherID = teachingPlan.getTeacherID();
    const subjectID = teachingPlan.getSubjectID();
    const classID = teachingPlan.getClassID();
    const dayInWeek = teachingPlan.getDayInWeek();
    const startSection = teachingPlan.getStartSection();

    const sqlQuery =
      `UPDATE THOIKHOABIEU ` +
      `SET mahk=${semesterID}, nambd=${yearStart}, namkt=${yearEnd}, ` +
      `magv='${teacherID}', mabm='${subjectID}', malop='${classID}', ` +
      `ngaytrongtuan=${dayInWeek}, tiet=${startSection});`;

    await ExecuteSQL(sqlQuery);

    return flagClass.DB.UPDATE;
  }

  static async InsertDB(teachingPlan) {
    const semesterID = teachingPlan.getSemester().getSemesterID();
    const yearStart = teachingPlan.getSemester().getYearStart();
    const yearEnd = teachingPlan.getSemester().getYearEnd();
    const teacherID = teachingPlan.getTeacherID();
    const subjectID = teachingPlan.getSubjectID();
    const classID = teachingPlan.getClassID();
    const dayInWeek = teachingPlan.getDayInWeek();
    const startSection = teachingPlan.getStartSection();

    const sqlQuery =
      `INSERT INTO THOIKHOABIEU(mahk, nambd, namkt, magv, mabm, malop, ngaytrongtuan, tiet) ` +
      `VALUES (${semesterID}, ${yearStart}, ${yearEnd}, '${teacherID}', '${subjectID}', '${classID}', ${dayInWeek}, ${startSection});`;

    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }
};

module.exports = TeachingPlan;
