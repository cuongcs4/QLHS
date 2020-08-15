const Class = require("../../../Model/Class/Class");
const Student = require("../../../Model/Class/Student");
const Relatives = require("../../../Model/Class/Relatives");

const getManagerClass = async (req, res, next) => {
  const classID = req.user.getClassID();

  const className = await Class.GetClassName(classID);

  const listStudent = await Student.Find({ id: null, classID: classID });

  const listStudentView = [];

  for (let i = 0; i < listStudent.length; i++) {
    const { id, identityCard, fullName, dob, address } = listStudent[i];

    const listRelatives = await Relatives.Find(id);

    const listRelativeView = listRelatives.map((item) => {
      const { relative, phoneNumber } = item;
      return `${phoneNumber}-${relative}`;
    });

    listStudentView.push({
      id: i + 1,
      username: id,
      identityCard,
      fullName,
      dob: `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`,
      address,
      listRelativeView,
    });
  }
  console.log(listStudentView);

  res.render("teacher/managerClass", {
    title: `Quản lý lớp chủ nhiệm ${className}`,
    style: ["styleTable.css"],
    user: req.user,
    listStudentView,
  });
};

module.exports = getManagerClass;
