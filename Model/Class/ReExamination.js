//Sơ đồ lớp của ReExamine

const Semester = require("./Semester");

const ExecuteSQL = require("../Database/ExecuteSQL");
const generateGUID = require("../Helper/services/generateGUID");
const checkExist = require("../Helper/services/checkExist");
const flagClass = require("../Helper/resource/Flag");
const { response } = require("express");

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
  setContent(newContent) {
    this.content = newContent;
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

  static async Find(
    { studentID, teacherID, ID },
    semesterID,
    yearStart,
    yearEnd
  ) {
    let latestSemester;
    if (typeof semesterID == "undefined") {
      latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    if (ID) {
      const sqlQuery =
        `SELECT PK.mapk as id, PK.mahs AS studentID, PK.magv AS teacherID, PK.mabm AS subjectID, PK.noidung AS content, PK.phanhoi AS response, PK.trangthai AS status, BM.tenbm AS subjectName ` +
        `FROM PHUCKHAO AS PK INNER JOIN BOMON AS BM ON BM.mabm=PK.mabm ` +
        `WHERE PK.mapk='${ID}'`;

      const result = await ExecuteSQL(sqlQuery);
      if (result) {
        const reExamine = new ReExamine(
          ID,
          latestSemester,
          result[0].studentID,
          result[0].teacherID,
          result[0].subjectID,
          result[0].content,
          result[0].response,
          result[0].status.toString()
        );
        return reExamine;
      }

      return null;
    }

    if (studentID) {
      const sqlQuery =
        `SELECT PK.mapk as id, PK.noidung AS content, PK.trangthai AS status, BM.tenbm AS subjectName, BM.mabm AS subjectID, PK.phanhoi AS response ` +
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
    const isExist = await checkExist("PHUCKHAO", "mapk", reExamine.id);
    if (isExist) {
      const sqlQuery =
        `UPDATE PHUCKHAO ` +
        `SET phanhoi='${reExamine.getResponse()}', trangthai=${reExamine.getStatus()}, noidung='${reExamine.getContent()}' ` +
        `WHERE mapk='${reExamine.getID()}'`;

      await ExecuteSQL(sqlQuery);

      return flagClass.DB.UPDATE;
    }
    const semester = reExamine.getSemester();
    const sqlQuery =
      `INSERT INTO PHUCKHAO (mapk, mahs, magv, mabm, mahk, nambd, namkt, noidung, trangthai) ` +
      `VALUES ('${reExamine.getID()}', '${reExamine.getStudentID()}', '${reExamine.getTeacherID()}', '${reExamine.getSubjectID()}', ` +
      `'${semester.getSemesterID()}', '${semester.getYearStart()}', '${semester.getYearEnd()}', '${reExamine.getContent()}', '${reExamine.getStatus()}')`;
    await ExecuteSQL(sqlQuery);
    return flagClass.DB.NEW;
  }
};

module.exports = ReExamine;
