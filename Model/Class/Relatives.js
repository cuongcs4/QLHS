//Sơ đồ lớp của Relatives

const ExecuteSQL = require("../Database/ExecuteSQL");
const flagClass = require("../Helper/resource/Flag");

const Relatives = class {
  constructor(studentID, relative, fullName, phoneNumber) {
    this.studentID = studentID || null;
    this.relative = relative || null;
    this.fullName = fullName || null;
    this.phoneNumber = phoneNumber || null;
  }

  getStudentID() {
    return this.studentID;
  }

  getRelative() {
    return this.relative;
  }
  setRelative(newRelative) {
    this.relative = newRelative;
  }

  getFullName() {
    return this.fullName;
  }
  setFullName(newFullName) {
    this.fullName = newFullName;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }
  setPhoneNumber(newPhoneNumber) {
    this.phoneNumber = newPhoneNumber;
  }

  static async Find(studentID) {
    const sqlQuery =
      `SELECT NT.quanhe AS relative, NT.hoten AS fullName, NT.sdt AS phoneNumber ` +
      `FROM NGUOITHAN AS NT ` +
      `WHERE NT.mahs='${studentID}'`;

    const result = await ExecuteSQL(sqlQuery);
    return result.length === 0 ? null : result;
  }

  static async Save(relatives) {
    const sqlQuery =
      `INSERT INTO NGUOITHAN(mahs, quanhe, hoten, sdt) ` +
      `VALUES ('${relatives.getStudentID()}','${relatives.getRelative()}',N'${relatives.getFullName()}','${relatives.getPhoneNumber()}')`;
    await ExecuteSQL(sqlQuery);
    return flagClass.DB.NEW;
  }
};

module.exports = Relatives;
