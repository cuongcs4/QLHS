const handleSemester = require("../../../Model/Helper/services/handleSemester");
const Semester = require("../../../Model/Class/Semester");

const getScheduleExam = async (req, res, next) => {
  let { year, semester } = req.query;

  const error_msg = [];

  //Lấy tất cả các học kỳ đã có
  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  //Lấy lịch coi thi của giáo viên
  let scheduleExam;

  if (typeof year == "undefined" && typeof semester == "undefined") {
    scheduleExam = await req.user.getScheduleExam();
  } else {
    const yearArray = year.split("-");
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

    scheduleExam = await req.user.getScheduleExam(
      semesterID,
      yearStart,
      yearEnd
    );
  }

  // //Sắp xếp lịch thi
  // scheduleExam.sort((a, b) => {
  //   if (a.dayExam < b.dayExam) {
  //     return -1;
  //   }

  //   if (a.dayExam > b.dayExam) {
  //     return 1;
  //   }

  //   // a == b
  //   return 0;
  // });

  //Gán lại cách hiển thị ngày coi thi
  for (let i = 0; i < scheduleExam.length; i++) {
    const dayExam = scheduleExam[i].dayExam;
    scheduleExam[i].dayExam = `${dayExam.getDate()}/${
      dayExam.getMonth() + 1
    }/${dayExam.getFullYear()}`;
  }

  //Render kết quả
  res.render("teacher/exam", {
    title: "Lịch gác thi",
    style: ["styleTable.css"],
    user: req.user,
    scheduleExam,
    allYearSemester,
    isLastSemester,
    error_msg,
  });
};

module.exports = getScheduleExam;
