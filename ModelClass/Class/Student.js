// Sơ đò lớp của Student kế thừa từ User.

const User = require("./User");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const Student = class extends User {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status,
    classID
  ) {
    super(id, username, password, identityCard, fullName, dob, address, status);
    this.classID = classID || null;
  }

  getClassID() {
    return this.classID;
  }
  setClassID(newClassID) {
    this.classID = newClassID;
  }

  static async Find({ id, classID }) {
    if (id) {
      const sqlQuery = `SELECT * FROM HOCSINH WHERE mahs='${id}'`;
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) return result[0];
      return null;
    }

    if (classID) {
      const sqlQuery = `SELECT * FROM HOCSINH WHERE malop='${classID}'`;
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) return result;
      return null;
    }
  }

  static async Save(student) {
    console.log(student);

    const isExist = await checkExist(
      "NGUOIDUNG",
      "tenDangNhap",
      student.username
    );

    const dobFormat = `${student.dob.getFullYear()}-${
      student.dob.getMonth() + 1
    }-${student.dob.getDate()}`;

    if (isExist) {
      //update

      //1. update password
      const sqlQuery1 = `UPDATE NGUOIDUNG SET matKhau="${student.password}"`;
      await ExecuteSQL(sqlQuery1);

      //2. update information
      const sqlQuery2 =
        `UPDATE HOCSINH ` +
        `SET ngaySinh="${dobFormat}", ` +
        `hoten="${student.fullName}", ` +
        `diachi="${student.address}", ` +
        `trangthai=${student.status} ` +
        `WHERE mahs="${student.id}"`;

      await ExecuteSQL(sqlQuery2);
      return flagClass.DB.UPDATE;
    }

    //insert

    //1. Insert NGUOIDUNG
    const sqlQuery1 =
      `INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, loai) ` +
      `VALUES ('${student.username}', '${student.password}', ${flagClass.TYPE_USER.STUDENT})`;

    await ExecuteSQL(sqlQuery1);

    //2. Insert HOCSINH
    const sqlQuery2 =
      `INSERT INTO HOCSINH (mahs, ngaysinh, hoten, diachi, malop, trangthai) ` +
      `VALUES ('${student.id}', '${dobFormat}', '${student.fullName}', '${student.address}', '${student.classID}', ${student.status})`;

    await ExecuteSQL(sqlQuery2);

    return flagClass.DB.NEW;
  }
};

// async function exec() {
//   const result = await Student.Find({ id: null, classID: null });

//   console.log(result);
// }
// exec();

module.exports = Student;
