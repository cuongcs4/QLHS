const Class = require("../../../Model/Class/Class");
const Semester = require("../../../Model/Class/Semester");

const handleSemester = require("../../../Model/Helper/services/handleSemester");

const getSchedule = async (req, res, next) => {
  let { year, semester } = req.query;

  const error_msg = [];

  //Lấy tất cả các học kỳ đã có
  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let schedule;

  //Lấy thời khóa biểu của giáo viên
  if (typeof year == "undefined" && typeof semester == "undefined") {
    schedule = await req.user.getSchedule();
  } else {
    let yearArray = year.split("-");
    let yearStart = parseInt(yearArray[0]);
    let yearEnd = parseInt(yearArray[1]);
    let semesterID = parseInt(semester);

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

    schedule = await req.user.getSchedule(semesterID, yearStart, yearEnd);
  }

  //Tạo thời khóa biểu dùng để hiển thị cho view
  const scheduleView = [];

  for (let i = 1; i <= 10; i++) {
    const line = [];
    line.push(i);
    for (let j = 1; j <= 6; j++) {
      line.push(" ");
    }

    scheduleView.push(line);
  }

  for (let i = 0; i < schedule.length; i++) {
    scheduleView[schedule[i].startSection - 1][
      schedule[i].dayInWeek
    ] = await Class.GetClassName(schedule[i].classID);
  }

  //Render kết quả
  res.render("teacher/schedule", {
    title: "Lịch dạy",
    style: ["styleTable.css"],
    user: req.user,
    scheduleView,
    allYearSemester,
    isLastSemester,
    error_msg,
  });
};

module.exports = getSchedule;
