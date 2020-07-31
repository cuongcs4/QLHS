const Semester = require("../../../ModelClass/Class/Semester");
const Teacher = require("../../../ModelClass/Class/Teacher");
const Class = require("../../../ModelClass/Class/Class");
const Room = require("../../../ModelClass/Class/Room");

const handleSemester = require("../../../ModelClass/Helper/services/handleSemester");

const getClass = async (req, res, next) => {
  let { year, semester } = req.query;

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  //Lấy lịch coi thi của giáo viên
  let { semesterID, yearStart, yearEnd } = await Semester.getLatestSemester();

  if (typeof year != "undefined" && typeof semester != "undefined") {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);
  }

  const listClass = await req.user.getClass(semesterID, yearStart, yearEnd);

  const listClassView = [];
  for (let i = 0; i < listClass.length; i++) {
    const classID = listClass[i].getClassID();
    const className = await Class.GetClassName(classID);
    const roomName = (await Room.Find(listClass[i].getRoomID())).getRoomName();
    const managerName = (
      await Teacher.Find(listClass[i].getManagerClass())
    ).getFullName();

    const linkManager = `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`;

    listClassView.push({
      classID,
      className,
      roomName,
      managerName,
      linkManager,
    });
  }

  console.log(listClassView);
  //Render kết quả
  res.render("teacher/class", {
    title: "Quản lý lớp học",
    style: ["styleTable.css"],
    user: req.user,
    listClassView,
    allYearSemester,
    isLastSemester,
  });
};

module.exports = getClass;
