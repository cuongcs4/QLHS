const Semester = require("../../../ModelClass/Class/Semester");
const Room = require("../../../ModelClass/Class/Room");

const handleSemester = require("../../../ModelClass/Helper/services/handleSemester");

const getRoomExam = async (req, res, next) => {
  const { year, semester } = req.query;

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
  } else {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);
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
  });
};

module.exports = getRoomExam;
