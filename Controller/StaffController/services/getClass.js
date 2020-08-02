const Class = require("../../../ModelClass/Class/Class");
const Teacher = require("../../../ModelClass/Class/Teacher");

const getAllClass = async (req, res, next) => {
  const listClass = await req.user.getClass();

  for (let key in listClass) {
    for (let i = 0; i < listClass[key].length; i++) {
      const { classID } = listClass[key][i];

      listClass[key][i]["className"] = await Class.GetClassName(classID);
      listClass[key][i]["link"] = `/staff/student/${classID}`;
    }
  }

  const { listClass10, listClass11, listClass12 } = listClass;

  console.log(listClass);

  res.render("staff/classTable", {
    title: "Danh sách lớp học",
    style: ["styleTable.css"],
    user: req.user,
    listClass10,
    listClass11,
    listClass12,
  });
};

const getClassByClassID = async (req, res, next) => {
  const classID = req.query.classID;

  const { managerClass, roomID, course, status } = (await Class.Find(
    classID
  )) || { managerClass: null, roomID: null, course: null, status: null };

  if (managerClass) {
    const managerName = (await Teacher.Find(managerClass)).getFullName();
    const className = await Class.GetClassName(classID);
    const link = `/staff/student/${classID}`;

    const classView = {
      classID,
      managerClass,
      roomID,
      course,
      status,
      managerName,
      className,
      link,
    };

    const success_msg = ["Tìm thành công."];

    res.render("staff/class", {
      title: "Danh sách lớp học",
      style: ["styleTable.css"],
      user: req.user,
      classView,
      success_msg,
    });
  } else {
    req.flash("error_msg", `Không tìm thấy lớp có mã "${classID}".`);
    res.redirect("/staff/class");
  }
};

const getClass = async (req, res, next) => {
  const classID = req.query.classID;

  if (typeof classID === "undefined" || classID.length === 0) {
    console.log("getAllClass");
    await getAllClass(req, res, next);
  } else {
    console.log("getClassByClassID");
    await getClassByClassID(req, res, next);
  }
};

module.exports = getClass;
