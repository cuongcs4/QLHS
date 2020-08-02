const Teacher = require("../../../ModelClass/Class/Teacher");
const Employee = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const Subject = require("../../../ModelClass/Class/Subject");
const flagClass = require("../../../ModelClass/Helper/resource/Flag");
const getManagerStaff = async (req, res, next) => {
  const listTeacher = await Teacher.Find();
  const listEmployee = await Employee.Find();
  const listTeacherView = [];
  const listEmployeeView = [];
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
        typeEmployee,
        status 
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
        typeEmployee,
        status
      });
    }
  }
  if (listEmployee !== null) {
    for (let i = 0; i < listEmployee.length; i++) {
      const { id, identityCard, fullName, dob, gender, address, status, typeUser } = listEmployee[i];

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
        typeUser
      });
    }
  }

  const listSubject = await Subject.Find();
  const listSubjectView = [];
  if (listSubject !== null) {
    for (let i = 0; i < listSubject.length; i++) {
        const {subjectID, subjectName} = listSubject[i];
      listSubjectView.push({
        subject: subjectID,
        subjectName
      });
    }
  }
  res.render("admin/staffTable", {
    title: `Danh sách nhân viên`,
    style: ["styleTable.css", "styleProfile.css"],
    user: req.user,
    listTeacherView,
    listEmployeeView,
    listSubjectView
  });
};
module.exports = getManagerStaff;
