//Sơ đồ lớp của Class

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const Class = class {
  constructor(classID, managerClass, roomID, course, status) {
    this.classID = classID || null;
    this.managerClass = managerClass || null;
    this.roomID = roomID || null;
    this.course = course || null;
    this.status = status || null;
  }

  getClassID() {
    return this.classID;
  }

  getManagerClass() {
    return this.managerClass;
  }

  setManagerClass(newManagerClass) {
    this.managerClass = newManagerClass;
  }

  getRoomID() {
    return this.roomID;
  }

  getCourse() {
    return this.course;
  }

  getStatus() {
    return this.status;
  }
  setStatus(newStatus) {
    this.status = newStatus;
  }

  static async Find(classID) {
    const sqlQuery = `SELECT * FROM LOPHOC WHERE malop='${classID}'`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const classID = result[0].malop;
      const managerClass = result[0].magvcn;
      const roomID = result[0].maphong;
      const course = result[0].namnhaphoc;
      const status = result[0].trangthai;

      return new Class(classID, managerClass, roomID, course, status);
    }
  }

  static async Save(classN) {
    const isExist = await checkExist("LOPHOC", "lop", classN.getClassID());

    if (isExist) {
      //update
      const sqlQuery =
        `UPDATE LOPHOC ` +
        `SET magvcn="${classN.getManagerClass()}", maphong="${classN.getRoomID()}", namnhaphoc=${classN.getCourse()}, trangthai=${classN.getStatus()} ` +
        `WHERE malop='${classN.getClassID()}'`;
      await ExecuteSQL(sqlQuery);

      return flagClass.DB.UPDATE;
    }

    //insert
    const sqlQuery =
      `INSERT INTO LOPHOC (malop, magvcn, maphong, namnhaphoc, trangthai) ` +
      `VALUES ('${classN.getClassID()}', '${classN.getManagerClass()}', '${classN.getRoomID()}', ${classN.getCourse()}, ${classN.getStatus()}`;
    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }
};

module.exports = Class;
