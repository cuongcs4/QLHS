//// Sơ đò lớp của Semester

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");

const flagClass = require("../Helper/resource/Flag");

const Semester = class {
  constructor(semesterID, yearStart, yearEnd, status) {
    this.semesterID = semesterID;
    this.yearStart = yearStart;
    this.yearEnd = yearEnd;
    this.status = status;
  }

  getSemesterID() {
    return this.semesterID;
  }

  getYearStart() {
    return this.yearStart;
  }

  getYearEnd() {
    return this.yearEnd;
  }

  getStatus() {
    return this.status;
  }

  setStatus(newStatus) {
    this.status = newStatus;
  }

  static async getLatestSemester() {
    const sqlQuery = `SELECT mahk AS semesterID, nambd AS yearStart, namkt AS yearEnd, trangthai AS status FROM HOCKY`;
    const result = await ExecuteSQL(sqlQuery);

    result.sort((a, b) => {
      if (a.yearStart < b.yearStart) return 1;
      if (a.yearStart > b.yearStart) return -1;
      if (a.semesterID < b.semesterID) return 1;
      if (a.semesterID > b.semesterID) return -1;

      return 0;
    });

    //console.log(result);

    const latestSemester = result[0];

    return new Semester(
      latestSemester.semesterID,
      latestSemester.yearStart,
      latestSemester.yearEnd,
      latestSemester.status
    );
  }

  static async Find(semesterID, yearStart, yearEnd) {
    if (typeof semesterID == "undefined") {
      const sqlQuery =
        `SELECT HK.nambd AS yearStart, HK.namkt AS yearEnd, HK.mahk AS semesterID, HK.trangthai AS status ` +
        `FROM HOCKY AS HK `;

      const result = await ExecuteSQL(sqlQuery);

      return result;
    }

    const sqlQuery =
      `SELECT * ` +
      `FROM HOCKY AS HK ` +
      `WHERE HK.mahk=${semesterID} AND HK.nambd=${yearStart} AND HK.namkt=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      return new Semester(
        result[0].mahk,
        result[0].nambd,
        result[0].namkt,
        result[0].trangthai
      );
    }

    return null;
  }

  static async Save(semester) {
    const isExist =
      (await Semester.Find(
        semester.getSemesterID(),
        semester.getYearStart(),
        semester.getYearEnd()
      )) !== null
        ? true
        : false;

    if (isExist) {
      //update
      const sqlQuery =
        `UPDATE HOCKY ` +
        `SET trangthai=${semester.getStatus()} ` +
        `WHERE mahk=${semester.getSemesterID()} AND nambd=${semester.getYearStart()} AND namkt=${semester.getYearEnd()} `;
      await ExecuteSQL(sqlQuery);

      return flagClass.DB.UPDATE;
    }

    //insert

    const sqlQuery =
      `INSERT INTO HOCKY (mahk, nambd, namkt, trangthai)` +
      `VALUES (${semester.getSemesterID()}, ${semester.getYearStart()}, ${semester.getYearEnd()}, ${semester.getStatus()})`;
    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }
};

module.exports = Semester;
