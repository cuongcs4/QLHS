const Student = require("../../../ModelClass/Class/Student");
const Class = require("../../../ModelClass/Class/Class");
const Teacher = require("../../../ModelClass/Class/Teacher");

const flagClass = require("../../../ModelClass/Helper/resource/Flag");

const getStudent = async (req, res, next) => {
  const classID = req.params.classID;
  const className = await Class.GetClassName(classID);
  const claSS = await Class.Find(classID);
  const managerClassName = (
    await Teacher.Find(claSS.getManagerClass())
  ).getFullName();

  const listStudent = await Student.Find({ id: null, classID: classID });

  const listStudentView = [];

  for (let i = 0; i < listStudent.length; i++) {
    const { id, fullName, dob, classID, address, status } = listStudent[i];

    listStudentView.push({
      id: i + 1,
      studentID: id,
      fullName,
      dob: `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`,
      classID,
      address,
      status: status === flagClass.STATUS.ENABLE ? "Đang mở" : "Đang khóa",
      isLock: status === flagClass.STATUS.DISABLE ? true : false,
      dataTarget:
        status === flagClass.STATUS.DISABLE ? `lock${i + 1}` : `unlock${i + 1}`,
    });
  }

  // res.send(listStudent);
  res.render("staff/studentTable", {
    title: `Danh sách học sinh ${className}(${classID})`,
    style: ["styleTable.css"],
    user: req.user,
    listStudentView,
    managerClassName,
  });
};

module.exports = getStudent;
