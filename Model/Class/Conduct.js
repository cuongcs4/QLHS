//Sơ đồ lớp của Conduct

const Semester = require("./Semester");
const Student = require("./Student");
const Class = require("./Class");

const ExecuteSQL = require("../Database/ExecuteSQL");

const flagClass = require("../Helper/resource/Flag");

const Conduct = class {
  constructor(semester, studentID, classID, teacherID, grade) {
    this.semester = semester;
    this.studentID = studentID;
    this.classID = classID;
    this.teacherID = teacherID;
    this.grade = grade;
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

  static async Save(conduct) {
    const { studentID, grade } = conduct;
    const { semesterID, yearStart, yearEnd } = conduct.getSemester();

    const sqlQuery =
      `UPDATE HANHKIEM ` +
      `SET xeploai=${grade} ` +
      `WHERE mahs='${studentID}' AND mahk=${semesterID} AND nambd=${yearStart} AND namkt=${yearEnd} `;

    await ExecuteSQL(sqlQuery);

    return flagClass.DB.UPDATE;
  }

  static async Insert(conduct) {
    const { studentID, grade, teacherID, classID } = conduct;
    const { semesterID, yearStart, yearEnd } = conduct.getSemester();

    const sqlQuery =
      `INSERT HANHKIEM(mahs, malop, magv, mahk, nambd, namkt, xeploai) ` +
      `VALUES ('${studentID}','${classID}','${teacherID}',${semesterID},${yearStart},${yearEnd},${grade})`;

    await ExecuteSQL(sqlQuery);

    return flagClass.DB.UPDATE;
  }
};

module.exports = Conduct;

// async function exec() {
//   const student = new Student(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

//   console.log(Student);
// }

// exec();
