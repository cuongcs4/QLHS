//// Sơ đò lớp của Semester

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const Semester = class {
  constructor(semesterID, yearStart, yearEnd, status) {
    this.semesterID = semesterID || null;
    this.yearStart = yearStart || null;
    this.yearEnd = yearEnd || null;
    this.status = status || null;
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

  static async GetLatestSemester() {
    const sqlQuery = `SELECT * FROM HOCKY`;
    const result = await ExecuteSQL(sqlQuery);

    const latestSemester = result[result.length - 1];

    return new Semester(
      latestSemester.mahk,
      latestSemester.nambd,
      latestSemester.namkt,
      latestSemester.trangthai
    );
  }

  static async Find(semesterID, yearStart, yearEnd) {
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
        `WHERE HK.mahk=${semester.getSemesterID()} AND HK.nambd=${semester.getYearStart()} AND HK.namkt=${semester.getYearEnd()} `;
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
