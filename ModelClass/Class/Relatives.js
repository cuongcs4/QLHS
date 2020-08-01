//Sơ đồ lớp của Relatives

const ExecuteSQL = require("../Database/ExecuteSQL");

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
      `SELECT NT.quanhe AS relative, NT.sdt AS phoneNumber ` +
      `FROM NGUOITHAN AS NT ` +
      `WHERE NT.mahs='${studentID}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result;
  }

  static save() {}
};

module.exports = Relatives;
