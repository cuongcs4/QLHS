//Sơ đồ lớp của TeachingPlan

const Semester = require("./Semester");

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");

const flagClass = require("../Helper/resource/Flag");

const TeachingPlan = class {
  constructor(
    semester,
    teacherID,
    subjectID,
    classID,
    dayInWeek,
    startSection
  ) {
    this.semester = semester;
    this.teacherID = teacherID;
    this.subjectID = subjectID;
    this.classID = classID;
    this.dayInWeek = dayInWeek;
    this.startSection = startSection;
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
  static async Find({ classID, teacherID}, semesterID, yearStart, yearEnd) {
    if (typeof semesterID === "undefined") {
      const latestSemester = await Semester.getLatestSemester();
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
      return result;
    }


    if (teacherID !== null) {
      // Lấy TKB của giáo viên
      const sqlQuery =
        `SELECT TKB.malop AS classID, TKB.mabm AS subjectID, TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection ` +
        `FROM THOIKHOABIEU AS TKB ` +
        `WHERE TKB.magv ='${teacherID}' AND TKB.mahk = '${semesterID}' AND TKB.nambd = '${yearStart}' AND TKB.namkt = '${yearEnd}'`;
      const result = await ExecuteSQL(sqlQuery);

      return result;
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
      `SET magv='${teacherID}', mabm='${subjectID}' ` +
      `WHERE mahk=${semesterID} AND nambd=${yearStart} AND namkt=${yearEnd} ` +
      `AND ngaytrongtuan=${dayInWeek} AND tiet=${startSection} AND malop='${classID}'`;

    console.log(sqlQuery);

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
