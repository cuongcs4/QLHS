const Semester = require("../../../Model/Class/Semester");
const Teacher = require("../../../Model/Class/Teacher");
const Class = require("../../../Model/Class/Class");
const Room = require("../../../Model/Class/Room");

const handleSemester = require("../../../Model/Helper/services/handleSemester");

const getClass = async (req, res, next) => {
  let { year, semester } = req.query;

  const error_msg = [];

  //Lấy tất cả các học kỳ đã có
  let { allYearSemester, isLastSemester } = await handleSemester(
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

    const isExistSemester = await Semester.Find(semesterID, yearStart, yearEnd);
    if (!isExistSemester) {
      error_msg.push(
        `Học kỳ ${semesterID} năm học ${yearStart}-${yearEnd} chưa có dữ liệu.`
      );

      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();

      isLastSemester = false;
    }
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

  //console.log(listClassView);
  //Render kết quả
  res.render("teacher/class", {
    title: "Quản lý lớp học",
    style: ["styleTable.css"],
    user: req.user,
    listClassView,
    allYearSemester,
    isLastSemester,
    error_msg,
  });
};

module.exports = getClass;
