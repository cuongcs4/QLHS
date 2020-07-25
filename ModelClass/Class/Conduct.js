//Sơ đồ lớp của Conduct

const Semester = require("./Semester");
const ExecuteSQL = require("../Database/ExecuteSQL");

const Conduct = class {
  constructor(semester, studentID, grade) {
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.grade = grade || null;
  }

  getSemester() {
    return this.semester;
  }

  getStudentID() {
    return this.studentID;
  }

  getGrade() {
    return this.grade;
  }
  setGrade(newGrade) {
    this.grade = newGrade;
  }

  static async Find({ studentID, classID }, semesterID, yearStart, yearEnd) {
    if (typeof semesterID == "undefined") {
      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    if (studentID !== null) {
      const sqlQuery =
        `SELECT HAK.mahs AS studentID, HAK.malop AS classID, HAK.xeploai AS grade ` +
        `FROM HANHKIEM AS HAK ` +
        `WHERE HAK.mahs='${studentID}' AND HAK.mahk=${semesterID} AND HAK.nambd=${yearStart} AND HAK.namkt=${yearEnd}`;
      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? null : result[0];
    }

    if (classID !== null) {
      const sqlQuery =
        `SELECT HAK.mahs AS studentID, HAK.malop AS classID, HAK.xeploai AS grade ` +
        `FROM HANHKIEM AS HAK ` +
        `WHERE HAK.malop='${classID}' AND HAK.mahk=${semesterID} AND HAK.nambd=${yearStart} AND HAK.namkt=${yearEnd}`;
      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? null : result;
    }
  }

  static save() {}
};

module.exports = Conduct;
