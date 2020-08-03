//Sơ đồ lớp của ExamPlan

const Semester = require("./Semester");

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");
const generateGUID = require("../Helper/services/generateGUID");

const flagClass = require("../Helper/resource/Flag");

const ExamPlan = class {
  constructor(
    id,
    semester,
    roomID,
    subjectID,
    dayExam,
    startSection,
    claSs,
    supervisorID1,
    supervisorID2
  ) {
    this.id = id || generateGUID();
    this.semester = semester;
    this.roomID = roomID;
    this.subjectID = subjectID;
    this.dayExam = dayExam;
    this.startSection = startSection;
    this.claSs = claSs;
    this.supervisorID1 = supervisorID1;
    this.supervisorID2 = supervisorID2;
  }

  getID() {
    return this.id;
  }

  getSemester() {
    return this.semester;
  }

  getRoomExamID() {
    return this.roomID;
  }
  setRoomExamID(newRoomExamID) {
    this.roomID = newRoomExamID;
  }

  getSubjectID() {
    return this.subjectID;
  }
  setSubjectID(newSubjectID) {
    this.subjectID = newSubjectID;
  }

  getDayExam() {
    return this.dayExam;
  }
  setDayExam(newDayExam) {
    this.dayExam = newDayExam;
  }

  getStartSection() {
    return this.startSection;
  }
  setStartSection(newStartSection) {
    this.startSection = newStartSection;
  }

  getSupervisorID1() {
    return this.supervisorID1;
  }
  setSupervisorID1(newSupervisorID) {
    this.supervisorID1 = newSupervisorID;
  }

  getSupervisorID2() {
    return this.supervisorID2;
  }
  setSupervisorID2(newSupervisorID) {
    this.supervisorID2 = newSupervisorID;
  }

  //Tìm kiếm lịch thi theo khối, học kỳ.
  static async Find(
    { id, studentID, teacherID },
    semesterID,
    yearStart,
    yearEnd
  ) {
    if (typeof semesterID === "undefined") {
      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    if (studentID !== null) {
      // Lấy lịch thi của học sinh theo mã hs
      const sqlQuery =
        `SELECT BM.tenbm AS subjectName, LT.ngaythi AS dayExam, PH.tenphong AS roomName, LT.tietbd AS startSection ` +
        `FROM LICHTHI AS LT, BOMON AS BM, PHONGTHI AS PT, PHONGHOC AS PH ` +
        `WHERE PH.maphong = PT.phonghoc AND LT.maphong = PT.maphongthi AND LT.mabm = BM.mabm AND PT.mahs = '${studentID}' AND BM.mabm = LT.mabm AND PT.mahk = '${semesterID}' AND PT.nambd = '${yearStart}' AND PT.namkt = '${yearEnd}'`;
      const result = await ExecuteSQL(sqlQuery);
      return result.length === 0 ? null : result;
    }

    if (teacherID !== null) {
      // Lấy lịch gác thi của giáo viên
      const sqlQuery =
        `SELECT BM.tenbm AS subjectName, PH.tenphong AS roomName, LT.mabm AS subjectID, LT.ngaythi AS dayExam, LT.maphong AS roomID, LT.tietBD AS startSection, ` +
        `LT.giamthi1 AS supervisorID1, LT.giamthi2 AS supervisorID2 ` +
        `FROM LICHTHI AS LT, BOMON AS BM, PHONGHOC AS PH ` +
        `WHERE LT.maphong=PH.maphong AND LT.mabm=BM.mabm ` +
        `AND (LT.giamthi1='${teacherID}' OR LT.giamthi2='${teacherID}') ` +
        `AND LT.mahk = ${semesterID} AND LT.nambd = ${yearStart} AND LT.namkt = ${yearEnd}`;
      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? [] : result;
    }

    if (id !== null) {
      const sqlQuery =
        `SELECT LT.malt AS id, LT.mahk AS semesterID, LT.nambd AS yearStart, LT.namkt AS yearEnd, ` +
        `LT.maphong AS roomID, LT.mabm AS subjectID, LT.ngaythi AS dayExam, LT.tietBD AS section, ` +
        `LT.khoi AS claSs, LT.giamthi1 AS supervisorID1, LT.giamthi2 AS supervisorID2 ` +
        `FROM LICHTHI AS LT ` +
        `WHERE LT.malt='${id}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length === 0) return null;

      const {
        semesterID,
        yearStart,
        yearEnd,
        roomID,
        subjectID,
        dayExam,
        section,
        claSs,
        supervisorID1,
        supervisorID2,
      } = result[0];

      const semester = await Semester.Find(semesterID, yearStart, yearEnd);
      return new ExamPlan(
        id,
        semester,
        roomID,
        subjectID,
        new Date(dayExam),
        section,
        claSs,
        supervisorID1,
        supervisorID2
      );
    }
  }

  static async Save(examPlan) {
    const isExist = await checkExist("LICHTHI", "malt", examPlan.getID());

    const {
      id,
      roomID,
      semester,
      subjectID,
      dayExam,
      startSection,
      claSs,
      supervisorID1,
      supervisorID2,
    } = examPlan;

    const dayString = `${dayExam.getFullYear()}-${
      dayExam.getMonth() + 1
    }-${dayExam.getDate()}`;

    if (isExist) {
      //update

      const sqlQuery =
        `UPDATE LICHTHI ` +
        `SET maphong='${roomID}', mabm='${subjectID}', ngaythi='${dayString}', ` +
        `tietBD=${startSection}, khoi=${claSs}, giamthi1='${supervisorID1}', giamthi2='${supervisorID2}' ` +
        `WHERE malt='${id}'`;

      await ExecuteSQL(sqlQuery);

      return flagClass.DB.UPDATE;
    } else {
      //insert
      const { semesterID, yearStart, yearEnd } = semester;

      const sqlQuery =
        `INSERT INTO LICHTHI(malt, mahk, nambd, namkt, maphong, mabm, ngaythi, tietBD, khoi, giamthi1, giamthi2) ` +
        `VALUES ('${id}',${semesterID},${yearStart},${yearEnd},'${roomID}','${subjectID}',` +
        `'${dayString}',${startSection},${claSs},'${supervisorID1}','${supervisorID2}')`;

      await ExecuteSQL(sqlQuery);

      return flagClass.DB.NEW;
    }
  }
};

// const exec = async () => {
//   const result = await ExamPlan.Find({ studentID: null, teacherID: "GV01" });

//   console.log(result);
// };

// exec();

module.exports = ExamPlan;
