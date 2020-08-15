const Teacher = require("../../../Model/Class/Teacher");
const Employee = require("../../../Model/Class/EmployeeTrainingDepartment");
const Subject = require("../../../Model/Class/Subject");
const getManagerStaff = async (req, res, next) => {
  const listTeacher = await Teacher.Find();
  const listEmployee = await Employee.Find();
  const listTeacherView = [];
  const listEmployeeView = [];
  const newTeacherID = await Teacher.GetNewTeacherID();
  const newEmployeeID = await Employee.GetNewEmployeeID();
  if (listTeacher !== null) {
    for (let i = 0; i < listTeacher.length; i++) {
      const {
        id,
        identityCard,
        fullName,
        dob,
        gender,
        address,
        phoneNumber,
        subjectID,
        typeUser,
        status,
      } = listTeacher[i];
      listTeacherView.push({
        id: i + 1,
        username: id,
        fullName,
        identityCard,
        dob: `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`,
        gender,
        address,
        phoneNumber,
        subjectID,
        dataTarget: `modalEditTeacher${i + 1}`,
        typeUser,
        status,
      });
    }
  }
  if (listEmployee !== null) {
    for (let i = 0; i < listEmployee.length; i++) {
      const {
        id,
        identityCard,
        fullName,
        dob,
        gender,
        address,
        status,
        typeUser,
      } = listEmployee[i];

      listEmployeeView.push({
        id: i + 1,
        username: id,
        fullName,
        identityCard,
        dob: `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`,
        gender,
        address,
        status,
        dataTarget: `modalEditEmployee${i + 1}`,
        typeUser,
      });
    }
  }

  const listSubject = await Subject.Find();
  const listSubjectView = [];
  if (listSubject !== null) {
    for (let i = 0; i < listSubject.length; i++) {
      const { subjectID, subjectName } = listSubject[i];
      listSubjectView.push({
        subject: subjectID,
        subjectName,
      });
    }
  }
  res.render("admin/staffTable", {
    title: `Danh sách nhân viên`,
    style: ["styleTable.css", "styleProfile.css"],
    user: req.user,
    listTeacherView,
    listEmployeeView,
    listSubjectView,
    newTeacherID,
    newEmployeeID,
  });
};
module.exports = getManagerStaff;
