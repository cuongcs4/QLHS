//Sơ đồ lớp của Subject
const ExecuteSQL = require("../Database/ExecuteSQL");
const flagClass = require("../MiniServices/Flag");

const Subject = class {
  constructor(subjectID, subjectName) {
    this.subjectID = subjectID || null;
    this.subjectName = subjectName || null;
  }

  getSubjectID() {
    return this.subjectID;
  }

  getSubjectName() {
    return this.subjectName;
  }

  static async Find(subjectID) {
    const sqlQuery = `SELECT * FROM BOMON WHERE mabm='${subjectID}'`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const subjectID = result[0].mabm;
      const subjectName = result[0].tenbm;

      return new Subject(subjectID, subjectName);
    }

    return null;
  }

  static save(subject) {
    const isExist = await checkExist(
      "BOMON",
      "mabm",
      subject.subjectID
    );

    if (isExist) {
      //update
      const sqlQuery = `UPDATE BOMON SET tenbm="${subject.getSubjectName()}" WHERE mabm='${subject.getSubjectID()}'`;
      await ExecuteSQL(sqlQuery);

      return flagClass.DB.UPDATE;
    }

    //insert
    const sqlQuery =
      `INSERT INTO BOMON (mabm, tenbm) ` +
      `VALUES ('${subject.getSubjectID()}', '${subject.getSubjectName()}'`;
    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }
};

module.exports = Subject;
