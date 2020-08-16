const Semester = require("../../../Model/Class/Semester");
const Room = require("../../../Model/Class/Room");

const handleSemester = require("../../../Model/Helper/services/handleSemester");

const getRoomExam = async (req, res, next) => {
  const { year, semester } = req.query;
  const error_msg = [];

  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let semesterID, yearStart, yearEnd;

  if (typeof year === "undefined" || typeof semester === "undefined") {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
  } else {
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

  const examRoom =
    (await req.user.getExamRoom(semesterID, yearStart, yearEnd)) || [];

  for (let i = 0; i < examRoom.length; i++) {
    const roomID = examRoom[i].roomID;
    const roomName = (await Room.Find(examRoom[i].room)).getRoomName();

    examRoom[i]["count"] = i + 1;
    examRoom[i]["roomName"] = roomName;
    examRoom[i][
      "manager"
    ] = `/staff/room-exam/student?roomID=${roomID}&semesterID=${semesterID}&year=${yearStart}-${yearEnd}`;
    examRoom[i][
      "export"
    ] = `/staff/room-exam/student?roomID=${roomID}&semesterID=${semesterID}&year=${yearStart}-${yearEnd}`;

    examRoom[i]["dataTarget"] = `Room${roomID}`;
    examRoom[i]["year"] = year;
    examRoom[i]["semesterID"] = semesterID;
    examRoom[i]["year"] = `${yearStart}-${yearEnd}`;
  }

  res.render("staff/examRoom", {
    title: "Danh sách phòng thi",
    style: ["styleTable.css"],
    user: req.user,
    allYearSemester,
    isLastSemester,
    examRoom,
    semesterID,
    year: `${yearStart}-${yearEnd}`,
    error_msg,
  });
};

module.exports = getRoomExam;
