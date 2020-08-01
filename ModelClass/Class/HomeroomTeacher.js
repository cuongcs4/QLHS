// Sơ đò lớp của HomeroomTeacher kế thừa từ Teacher.

const Teacher = require("./Teacher");
const Class = require("./Class");
const Student = require("./Student");

const ExecuteSQL = require("../Database/ExecuteSQL");

const flagClass = require("../Helper/resource/Flag");

const HomeroomTeacher = class extends Teacher {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    gender,
    address,
    status,
    typeUser,
    phoneNumber,
    typeEmployee,
    subjectID,
    classID
  ) {
    super(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      typeUser,
      phoneNumber,
      typeEmployee,
      subjectID
    );
    this.classID = classID || null;
  }

  getClassID() {
    return this.classID;
  }

  async getClassName() {
    return await Class.GetClassName(this.classID);
  }

  setClass(newClassID) {
    this.classID = newClassID;
  }

  async getStudent() {
    const studentInClass = await Student.Find({
      id: null,
      classID: this.classID,
    });

    return studentInClass;
  }

  getConduct(semesterID, yearStart, yearEnd) {}

  static async Find(teacherID) {
    const teacher = await Teacher.Find(teacherID);

    if (teacher === null) return null;
    const {
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      phoneNumber,
      typeEmployee,
      subjectID,
    } = teacher;

    const sqlQuery =
      `SELECT LH.malop AS classID ` +
      `FROM LOPHOC AS LH ` +
      `WHERE LH.magvcn='${teacherID}'`;

    const claSs = await ExecuteSQL(sqlQuery);

    if (claSs.length === 0) return null;

    const classID = claSs[0].classID;
    const typeUser = flagClass.TYPE_USER.HOMEROOM_TEACHER;

    return new HomeroomTeacher(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      typeUser,
      phoneNumber,
      typeEmployee,
      subjectID,
      classID
    );
  }

  static save() {}
};

module.exports = HomeroomTeacher;
