const ExecuteSQL = require("../../Database/ExecuteSQL");
const Admin = require("../../Class/Admin");
const Teacher = require("../../Class/Teacher");
const HomeroomTeacher = require("../../Class/HomeroomTeacher");
const EmployeeTrainingDepartment = require("../../Class/EmployeeTrainingDepartment");
const Student = require("../../Class/Student");
const flagClass = require("../resource/Flag");

const getUserByUsername = async (userName) => {
  userName = userName.toUpperCase();

  if (userName === "ADMIN") {
    userName = userName.toLowerCase();
  }

  const sql = `SELECT * FROM NGUOIDUNG WHERE tenDangNhap='${userName}'`;
  const result = await ExecuteSQL(sql);

  if (result.length !== 0) {
    let usr;

    switch (result[0].loai) {
      case flagClass.TYPE_USER.ADMIN:
        usr = await Admin.Find(userName);
        break;

      case flagClass.TYPE_USER.TEACHER:
        usr = await Teacher.Find(userName);
        break;

      case flagClass.TYPE_USER.HOMEROOM_TEACHER:
        //console.log("HomeroomTeacher");
        usr = await HomeroomTeacher.Find(userName);
        break;

      case flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT:
        usr = await EmployeeTrainingDepartment.Find(userName);
        break;

      case flagClass.TYPE_USER.STUDENT:
        usr = await Student.Find({ id: userName, class: null });
        break;
    }

    //console.log(usr);
    return usr;
  }

  return null;
};

module.exports = getUserByUsername;
