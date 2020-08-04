const Teacher = require("../../../ModelClass/Class/Teacher");
const Employee = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const Flag = require("../../../ModelClass/Helper/resource/Flag");

const postManagerStaff = async (req, res, next) => {
  console.log(req.body);
  const { username, status } = req.body;
  const statusInt = parseInt(status,10);
  const teacher = await Teacher.Find(username);
  const employee = await Employee.Find(username);
  if (teacher !== null) {
    teacher.status = statusInt;
    await Teacher.Save(teacher);
  }
  if (employee !== null) {
    employee.status = statusInt;
    await Employee.Save(employee);
  }
  req.flash("success_msg", "Thành công.");
  res.redirect(`/admin/employee`);
};

module.exports = postManagerStaff;
