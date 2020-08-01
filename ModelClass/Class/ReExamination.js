//Sơ đồ lớp của ReExamine

const Semester = require("./Semester");

const ExecuteSQL = require("../Database/ExecuteSQL");
const generateGUID = require("../Helper/services/generateGUID");

const flagClass = require("../Helper/resource/Flag");

const ReExamine = class {
  constructor(
    id,
    semester,
    studentID,
    teacherID,
    subjectID,
    content,
    response,
    status
  ) {
    this.id = id || generateGUID();
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.teacherID = teacherID || null;
    this.subjectID = subjectID || null;
    this.content = content || null;
    this.response = response || null;
    this.status = status || null;
  }

  getID() {
    return this.id;
  }

  getSemester() {
    return this.semester;
  }

  getStudentID() {
    return this.studentID;
  }

  getTeacherID() {
    return this.teacherID;
  }

  getSubjectID() {
    return this.subjectID;
  }

  getContent() {
    return this.content;
  }

  getResponse() {
    return this.response;
  }
  setResponse(newResponse) {
    this.response = newResponse;
  }

  getStatus() {
    return this.status;
  }
  setStatus(newStatus) {
    this.status = newStatus;
  }

  static async Find({ studentID, teacherID }, semesterID, yearStart, yearEnd) {
    if (typeof semesterID == "undefined") {
      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    if (studentID) {
      const sqlQuery =
        `SELECT PK.mahs AS studentID, PK.noidung AS content, PK.trangthai AS status, BM.tenbm AS subjectName, BM.mabm AS subjectID ` +
        `FROM PHUCKHAO AS PK INNER JOIN BOMON AS BM ON BM.mabm=PK.mabm ` +
        `WHERE PK.mahs='${studentID}' AND PK.mahk=${semesterID} AND PK.nambd=${yearStart} AND PK.namkt=${yearEnd}`;

      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? null : result;
    }

    if (teacherID) {
      const sqlQuery =
        `SELECT PK.mapk AS id, PK.mahs AS studentID, HS.hoten AS studentName, HS.malop AS classID, PK.noidung AS content, PK.phanhoi AS response, PK.trangthai AS status ` +
        `FROM PHUCKHAO AS PK INNER JOIN HOCSINH AS HS ON PK.mahs=HS.mahs ` +
        `WHERE PK.magv='${teacherID}' AND PK.mahk=${semesterID} AND PK.nambd=${yearStart} AND PK.namkt=${yearEnd}`;

      const result = await ExecuteSQL(sqlQuery);

      return result;
    }
  }

  static async Save(reExamine) {
    const sqlQuery =
      `UPDATE PHUCKHAO ` +
      `SET phanhoi='${reExamine.getResponse()}', trangthai=${reExamine.getStatus()} ` +
      `WHERE mapk='${reExamine.getID()}' `;

    await ExecuteSQL(sqlQuery);

    return flagClass.DB.UPDATE;
  }
};

module.exports = ReExamine;
