//Sơ đồ lớp của ExamRoom kế thừa từ Room

const Room = require("./Room");

const ExamRoom = class extends Room {
  constructor(roomID, roomName, roomType, semester) {
    super(roomID, roomName, roomType);

    this.semester = semester || null;
  }

  getSemester() {
    return this.semester;
  }

  static async GetStudents(examRoomID, semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT HS.mahs AS studentID, HS.hoten AS studentFullName, HS.ngaysinh AS dob` +
      `FROM PHONGTHI AS PT INNER JOIN HOCSINH AS HS ON PT.mahs=HS.mahs ` +
      `WHERE PT.maphongthi='${examRoomID} AND PT.mahk=${semesterID} AND PT.nambd=${yearStart} AND PT.namkt=${yearEnd}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result.length === 0 ? null : result;
  }

  static async Find(semesterID, yearStart, yearEnd) {
    if (semesterID === null) {
      const latestSemester = await Semester.GetLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();
    }

    const sqlQuery =
      `SELECT PT.maphongthi as roomID, PT.phonghoc AS room, COUNT(PT.mahs) AS quantity ` +
      `FROM PHONGTHI AS PT ` +
      `WHERE PT.mahk=${semesterID} AND PT.nambd=${yearStart} AND PT.namkt=${yearEnd} ` +
      `GROUP BY PT.maphongthi`;

    const result = await ExecuteSQL(sqlQuery);

    return result.length === 0 ? null : result;
  }

  static save() {}
};

module.exports = ExamRoom;
