const Student = require("../../../Model/Class/Student");
const Class = require("../../../Model/Class/Class");
const Teacher = require("../../../Model/Class/Teacher");
const Relatives = require("../../../Model/Class/Relatives");

const flagClass = require("../../../Model/Helper/resource/Flag");

const getAllStudent = async (req, res, next) => {
  const classID = req.params.classID;
  const className = await Class.GetClassName(classID);
  const claSS = await Class.Find(classID);
  const managerClassName = (
    await Teacher.Find(claSS.getManagerClass())
  ).getFullName();

  const listStudent = await Student.Find({ id: null, classID: classID });

  const listStudentView = [];

  for (let i = 0; i < listStudent.length; i++) {
    const { id, gender, fullName, dob, classID, address, status } = listStudent[
      i
    ];

    //console.log(gender);

    const relatives = await Relatives.Find(id);
    if (relatives !== null) {
      const dad = {};
      const mom = {};

      //console.log(relatives);
      relatives.map((item) => {
        if (item.relative == "Ba") {
          dad.fullName = item.fullName;
          dad.phoneNumber = item.phoneNumber;
        } else {
          mom.fullName = item.fullName;
          mom.phoneNumber = item.phoneNumber;
        }
      });

      listStudentView.push({
        id: i + 1,
        studentID: id,
        fullName,
        dob: `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`,
        classID,
        gender: gender == flagClass.GENDER.MALE ? "Nam" : "Nữ",
        address,
        status: status == flagClass.STATUS.ENABLE ? "Đang mở" : "Đang khóa",
        isLock: status == flagClass.STATUS.DISABLE ? true : false,
        dataTarget:
          status === flagClass.STATUS.DISABLE
            ? `lock${i + 1}`
            : `unlock${i + 1}`,
        dad,
        mom,
      });
    }
  }

  res.render("staff/studentTable", {
    title: `Danh sách học sinh ${className}(${classID})`,
    style: ["styleTable.css"],
    user: req.user,
    listStudentView,
    managerClassName,
    classID,
  });
};

const getStudentByStudentID = async (req, res, next) => {
  const studentID = req.query.studentID;
  const classID = req.params.classID;
  const className = await Class.GetClassName(classID);
  const claSS = await Class.Find(classID);
  const managerClassName = (
    await Teacher.Find(claSS.getManagerClass())
  ).getFullName();

  const student = await Student.Find({ id: studentID, classID: null });

  if (student === null) {
    req.flash("error_msg", `Không tìm thấy học sinh có mã "${studentID}".`);
    res.redirect(`/staff/student/${classID}`);
    return;
  } else {
    const { id, gender, fullName, dob, classID, address, status } = student;

    const relatives = await Relatives.Find(id);

    const dad = {};
    const mom = {};

    const listStudentView = [];

    //console.log(relatives);
    relatives.map((item) => {
      if (item.relative == "Ba") {
        dad.fullName = item.fullName;
        dad.phoneNumber = item.phoneNumber;
      } else {
        mom.fullName = item.fullName;
        mom.phoneNumber = item.phoneNumber;
      }
    });

    listStudentView.push({
      id: 1,
      studentID: id,
      fullName,
      dob: `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`,
      classID,
      gender: gender == flagClass.GENDER.MALE ? "Nam" : "Nữ",
      address,
      status: status == flagClass.STATUS.ENABLE ? "Đang mở" : "Đang khóa",
      isLock: status == flagClass.STATUS.DISABLE ? true : false,
      dataTarget:
        status === flagClass.STATUS.DISABLE ? `lock${1}` : `unlock${1}`,
      dad,
      mom,
    });

    res.render("staff/studentTable", {
      title: `Danh sách học sinh ${className}(${classID})`,
      style: ["styleTable.css"],
      user: req.user,
      listStudentView,
      managerClassName,
      classID,
      success_msg: [`Tìm thấy học sinh mã "${studentID}".`],
    });
  }
};

const getStudent = async (req, res, next) => {
  const studentID = req.query.studentID;

  if (typeof studentID === "undefined" || studentID.length === 0) {
    await getAllStudent(req, res, next);
  } else {
    await getStudentByStudentID(req, res, next);
  }
};

module.exports = getStudent;
