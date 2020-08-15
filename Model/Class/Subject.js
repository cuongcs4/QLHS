//Sơ đồ lớp của Subject
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");

const flagClass = require("../Helper/resource/Flag");

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
    if (typeof subjectID !== "undefined") {
      const sqlQuery = `SELECT * FROM BOMON WHERE mabm='${subjectID}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const subjectID = result[0].mabm;
        const subjectName = result[0].tenbm;

        return new Subject(subjectID, subjectName);
      }

      return null;
    } else {
      const sqlQuery = `SELECT * FROM BOMON`;
      const result = await ExecuteSQL(sqlQuery);
      if (result.length !== 0) {
        const listSubjects = [];

        for (let i = 0; i < result.length; i++) {
          const subjectID = result[i].mabm;
          const subjectName = result[i].tenbm;

          listSubjects.push(new Subject(subjectID, subjectName));
        }
        return listSubjects;
      }
      return null;
    }
  }
};

// const exec = async () => {
//   const result = await Subject.Find();
//   //console.log(result);
// };
// exec();

module.exports = Subject;
