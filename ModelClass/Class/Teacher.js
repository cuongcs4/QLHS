// Sơ đò lớp của Teacher kế thừa từ Employee.

const Employee = require("./Employee");
const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");
const Class = require("./Class");

const Teacher = class extends Employee {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status,
    typeUser,
    phoneNumber,
    typeEmployee,
    subjectID
  ) {
    super(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      address,
      status,
      typeUser,
      phoneNumber,
      typeEmployee
    );
    this.subjectID = subjectID || null;
  }

  getSubjectID() {
    return this.subjectID;
  }

  setSubject(newSubjectID) {
    this.subjectID = newSubjectID;
  }

  async getClass({ semesterID, yearStart, yearEnd }) {
    //Mặc định lấy những lớp học ở học kỳ hiện tại nếu có.
    if (semesterID === null) {
      const sqlQuery =
        `SELECT LH.malop, LH.maphong, LH.magvcn, LH.namnhaphoc, LH.trangthai ` +
        `FROM LOPHOC AS LH, THOIKHOABIEU AS TKB, HOCKY AS HK ` +
        `WHERE LH.malop=TKB.malop AND HK.mahk=TKB.mahk AND HK.nambd=TKB.nambd AND HK.namkt=TKB.namkt AND TKB.magv='${this.id}' AND HK.trangthai=1 AND LH.trangthai=1`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listClass = [];

        for (let i = 0; i < result.length; i++) {
          const classID = result[i].malop;
          const managerClass = result[i].magvcn;
          const roomID = result[i].maphong;
          const course = result[i].namnhaphoc;
          const status = result[i].trangthai;

          listClass.push(
            new Class(classID, managerClass, roomID, course, status)
          );
        }

        return listClass;
      }

      return null;
    }

    const sqlQuery =
      `SELECT * ` +
      `FROM LOPHOC AS LH INNER JOIN THOIKHOABIEU AS TKB ON LH.malop=TKB.malop ` +
      `WHERE TKB.magv='${this.id}' AND TKB.mahk='${semesterID}' AND TKB.nambd='${yearStart}' AND TKB.namkt='${yearEnd}'`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const listClass = [];

      for (let i = 0; i < result.length; i++) {
        const classID = result[i].malop;
        const managerClass = result[i].magvcn;
        const roomID = result[i].maphong;
        const course = result[i].namnhaphoc;
        const status = result[i].trangthai;

        listClass.push(
          new Class(classID, managerClass, roomID, course, status)
        );
      }

      return listClass;
    }

    return null;
  }

  //Lấy danh sách điểm theo lớp
  async getScore(classID, semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT * ` +
      `FROM DIEM AS DI INNER JOIN HOCSINH AS HS ON DI.mahs=HS.mahs ` +
      `WHERE DI.malop='${classID}' AND DI.mahk=${semesterID} AND DI.nambd=${yearStart} AND DI.mahk=${yearEnd}`;
  }

  getReExamine() {}

  getSchedule() {}

  getScheduleExam() {}

  static async Find(userName) {
    const sqlQuery =
      `SELECT * ` +
      `FROM GIAOVIEN AS GV INNER JOIN NGUOIDUNG AS ND ON GV.magv=NG.tenDangNhap` +
      `WHERE GV.magv='${userName}'`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const id = result[0].magv;
      const username = result[0].magv;
      const password = result[0].matkhau;
      const identityCard = result[0].cmnd;
      const fullName = result[0].hoten;
      const dob = new Date(result[0].dob);
      const address = result[0].diachi;
      const status = result[0].trangthai;
      const phoneNumber = result[0].std;
      const typeEmployee = result[0].loai;
      const subjectID = result[0].mabm;

      return new Teacher(
        id,
        username,
        password,
        identityCard,
        fullName,
        dob,
        address,
        status,
        phoneNumber,
        typeEmployee,
        subjectID
      );
    }

    return null;
  }

  static async Save(teacher) {
    const isExist = await checkExist(
      "NGUOIDUNG",
      "tenDangNhap",
      teacher.username
    );

    const dobFormat = `${teacher.dob.getFullYear()}-${
      teacher.dob.getMonth() + 1
    }-${teacher.dob.getDate()}`;

    if (isExist) {
      //update

      //1. update NGUOIDUNG
      const sqlQuery1 =
        `UPDATE NGUOIDUNG ` +
        `SET matKhau="${teacher.getPassWord()}", cmnd='${teacher.getIdentityCard()}' ` +
        `WHERE tenDangNhap='${teacher.getID()}'`;
      await ExecuteSQL(sqlQuery1);

      //2. update GIAOVIEN
      const sqlQuery2 =
        `UPDATE GIAOVIEN ` +
        `SET ngaySinh="${dobFormat}", ` +
        `hoten="${teacher.getFullName()}", ` +
        `diachi="${teacher.getAddress()}", ` +
        `std="${teacher.getPhoneNumber()}", ` +
        `mabm="${teacher.getSubjectID()}", ` +
        `trangthai=${teacher.getStatus()} ` +
        `WHERE mahs="${teacher.getID()}"`;

      await ExecuteSQL(sqlQuery2);

      return flagClass.DB.UPDATE;
    }

    //insert

    //1. Insert NGUOIDUNG
    const sqlQuery1 =
      `INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, cmnd, loai) ` +
      `VALUES ('${teacher.getUserName()}', '${teacher.getPassWord()}', '${teacher.getIdentityCard()}', ${
        flagClass.TYPE_USER.TEACHER
      })`;

    await ExecuteSQL(sqlQuery1);

    //2. Insert GIAOVIEN
    const sqlQuery2 =
      `INSERT INTO GIAOVIEN (magv, ngaysinh, hoten, diachi, std, mabm, trangthai) ` +
      `VALUES ('${teacher.getUserName()}', '${dobFormat}', '${teacher.getFullName()}', '${teacher.getAddress()}', '${teacher.getPhoneNumber()}', '${teacher.getSubjectID()}', ${teacher.getStatus()})`;

    await ExecuteSQL(sqlQuery2);

    return flagClass.DB.NEW;
  }
};

module.exports = Teacher;
