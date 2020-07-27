const ExecuteSQL = require("../Database/ExecuteSQL");
const Admin = require("../Class/Admin");
const Teacher = require("../Class/Teacher");
const EmployeeTrainingDepartment = require("../Class/EmployeeTrainingDepartment");
const Student = require("../Class/Student");
const flagClass = require("../MiniServices/Flag");

const getUserByUsername = async (userName) => {
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

      case flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT:
        usr = await EmployeeTrainingDepartment.Find(userName);
        break;

      case flagClass.TYPE_USER.STUDENT:
        usr = await Student.Find({ id: userName, class: null });
        break;
    }

    return usr;
  }

  return null;
};

module.exports = getUserByUsername;
