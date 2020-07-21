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
      const sqlQuery =
        `SELECT * ` +
        `FROM HOCSINH AS HS INNER JOIN NGUOIDUNG AS ND ON HS.mahs = ND.tenDangNhap ` +
        `WHERE HS.mahs='${id}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const studentOnDB = result[0];

        const id = studentOnDB.mahs;
        const username = studentOnDB.mahs;
        const password = resultPassword[0].matKhau;
        const dob = new Date(studentOnDB.ngaysinh);
        const identityCard = studentOnDB.cmnd;
        const fullName = studentOnDB.hoten;
        const address = studentOnDB.diachi;
        const classID = studentOnDB.malop;
        const status = studentOnDB.status;

        return new Student(
          id,
          username,
          password,
          identityCard,
          fullName,
          dob,
          address,
          status,
          classID
        );
      }

      return null;
    }

    if (classID) {
      const sqlQuery = `SELECT * FROM HOCSINH WHERE malop='${classID}'`;
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listStudents = [];

        for (let i = 0; i < result.length; i++) {
          const studentOnDB = result[0];

          const id = studentOnDB.mahs;
          const username = studentOnDB.mahs;
          const password = resultPassword[0].matKhau;
          const dob = new Date(studentOnDB.ngaysinh);
          const identityCard = studentOnDB.cmnd;
          const fullName = studentOnDB.hoten;
          const address = studentOnDB.diachi;
          const classID = studentOnDB.malop;
          const status = studentOnDB.status;

          listStudents.push(
            new Student(
              id,
              username,
              password,
              identityCard,
              fullName,
              dob,
              address,
              status,
              classID
            )
          );
        }

        return listStudents;
      }

      return null;
    }
  }

  static async Save(student) {
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
      const sqlQuery1 = `UPDATE NGUOIDUNG SET matKhau="${student.getPassWord()}" WHERE tenDangNhap='${student.getID()}'`;
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

async function exec() {
  const sqlQuery = `SELECT * FROM HOCSINH AS HS inner join NGUOIDUNG AS ND on HS.mahs = ND.tenDangNhap`;
  const result = await ExecuteSQL(sqlQuery);

  console.log(result[0].matKhau);

  //const result = await Student.Find({ id: "HS03", classID: null });

  //console.log(new Date(result.ngaysinh).getFullYear());
}
exec();

module.exports = Student;
