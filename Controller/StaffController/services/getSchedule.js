const Class = require("../../../ModelClass/Class/Class");
const Semester = require("../../../ModelClass/Class/Semester");

const handleSemester = require("../../../ModelClass/Helper/services/handleSemester");

const getSchedule = async (req, res, next) => {
  const classID = req.params.classID;
  const className = await Class.GetClassName(classID);
  let statusSemester;

  let { year, semester } = req.query;

  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let semesterID, yearStart, yearEnd;

  if (typeof year === "undefined" || typeof semester === "undefined") {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
    statusSemester = latestSemester.getStatus();
  } else {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);
    statusSemester = (
      await Semester.Find(semesterID, yearStart, yearEnd)
    ).getStatus();
  }

  const listSchedule = await req.user.getSchedule(
    classID,
    semesterID,
    yearStart,
    yearEnd
  );

  //Tạo list schedule để hiển thị lên giao diện
  const listScheduleView = [
    { count: 1 },
    { count: 2 },
    { count: 3 },
    { count: 4 },
    { count: 5 },
    { count: 6 },
    { count: 7 },
    { count: 8 },
    { count: 9 },
    { count: 10 },
  ];

  for (let i = 0; i < listSchedule.length; i++) {
    const {
      startSection,
      dayInWeek,
      subjectName,
      teacherID,
      teacherFullName,
    } = listSchedule[i];

    const nameTeacher = teacherFullName.split(" ");

    listScheduleView[startSection - 1][`${dayInWeek}`] = {
      subjectName: subjectName,
      teacher: `${teacherID}-${nameTeacher[nameTeacher.length - 1]}`,
    };
  }

  //res.send({ listScheduleView, listSchedule });

  res.render("staff/schedule", {
    title: `Thời khóa biểu lớp ${className}(${classID})`,
    style: ["styleTable.css"],
    user: req.user,
    listScheduleView,
    allYearSemester,
    isLastSemester,
    statusSemester,
    classID,
    className,
    year: `${yearStart}-${yearEnd}`,
    semesterID,
  });
};

module.exports = getSchedule;
