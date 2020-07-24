//Sơ đồ lớp của Class

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const Class = class {
  constructor(classID, managerClass, roomID, course, status) {
    this.classID = classID || null;
    this.managerClass = managerClass || null;
    this.roomID = roomID || null;
    this.course = course || null;
    this.status = status || null;
  }

  getClassID() {
    return this.classID;
  }

  getManagerClass() {
    return this.managerClass;
  }

  setManagerClass(newManagerClass) {
    this.managerClass = newManagerClass;
  }

  getRoomID() {
    return this.roomID;
  }

  getCourse() {
    return this.course;
  }

  getStatus() {
    return this.status;
  }
  setStatus(newStatus) {
    this.status = newStatus;
  }

  async getStudentInClass() {
    const sqlQuery =
      `SELECT HS.mahs AS studentID, HS.hoten AS fullName, HS.ngaysinh AS dob, HS.trangthai AS status ` +
      `FROM LOPHOC AS LH INNER JOIN HOCSINH AS HS ON HS.malop=LH.malop ` +
      `WHERE LH.malop='${this.classID}'`;

    const result = await ExecuteSQL(sqlQuery);

    return result.length === 0 ? null : result;
  }

  static async Find(classID) {
    const sqlQuery = `SELECT * FROM LOPHOC WHERE malop='${classID}'`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const classID = result[0].malop;
      const managerClass = result[0].magvcn;
      const roomID = result[0].maphong;
      const course = result[0].namnhaphoc;
      const status = result[0].trangthai;

      return new Class(classID, managerClass, roomID, course, status);
    }

    return null;
  }

  static async Save(classN) {
    const isExist = await checkExist("LOPHOC", "lop", classN.getClassID());

    if (isExist) {
      //update
      const sqlQuery =
        `UPDATE LOPHOC ` +
        `SET magvcn="${classN.getManagerClass()}", maphong="${classN.getRoomID()}", namnhaphoc=${classN.getCourse()}, trangthai=${classN.getStatus()} ` +
        `WHERE malop='${classN.getClassID()}'`;
      await ExecuteSQL(sqlQuery);

      return flagClass.DB.UPDATE;
    }

    //insert
    const sqlQuery =
      `INSERT INTO LOPHOC (malop, magvcn, maphong, namnhaphoc, trangthai) ` +
      `VALUES ('${classN.getClassID()}', '${classN.getManagerClass()}', '${classN.getRoomID()}', ${classN.getCourse()}, ${classN.getStatus()}`;
    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }
};

// const exec = async () => {
//   const findClass = await Class.Find("LH201801");

//   console.log(await findClass.getStudentInClass());
// };

// exec();

module.exports = Class;
