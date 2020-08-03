const Semester = require("../../../ModelClass/Class/Semester");
const Teacher = require("../../../ModelClass/Class/Teacher");
const Subject = require("../../../ModelClass/Class/Subject");
const Room = require("../../../ModelClass/Class/Room");

const handleSemester = require("../../../ModelClass/Helper/services/handleSemester");

const getExam = async (req, res, next) => {
  let { year, semester, claSs } = req.query;

  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  const listClaSs = [];

  if (typeof claSs === "undefined") {
    listClaSs.push(10);
    listClaSs.push(11);
    listClaSs.push(12);
    claSs = 10;
  } else {
    switch (parseInt(claSs)) {
      case 10:
        listClaSs.push(10);
        listClaSs.push(11);
        listClaSs.push(12);
        break;

      case 11:
        listClaSs.push(11);
        listClaSs.push(10);
        listClaSs.push(12);
        break;

      case 12:
        listClaSs.push(12);
        listClaSs.push(10);
        listClaSs.push(11);
        break;
    }
  }

  let semesterID, yearStart, yearEnd, statusSemester;

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

  //Lấy lịch thi
  const {
    listScheduleExam10,
    listScheduleExam11,
    listScheduleExam12,
  } = await req.user.getScheduleExam(semesterID, yearStart, yearEnd);

  let listScheduleExam = [];
  switch (parseInt(claSs)) {
    case 10:
      listScheduleExam = listScheduleExam10;
      break;
    case 11:
      listScheduleExam = listScheduleExam11;
      break;
    case 12:
      listScheduleExam = listScheduleExam12;
      break;

    default:
      listScheduleExam = listScheduleExam10;
  }

  //Tạo lịch thi để hiển thị

  for (let i = 0; i < listScheduleExam.length; i++) {
    const schedule = listScheduleExam[i];

    const subjectName = (
      await Subject.Find(schedule.subjectID)
    ).getSubjectName();

    const roomName = (await Room.Find(schedule.roomID)).getRoomName();

    const dayExam = new Date(schedule.dayExam);

    const supervisor1 = (
      await Teacher.Find(schedule.supervisorID1)
    ).getFullName();

    const supervisor2 = (
      await Teacher.Find(schedule.supervisorID2)
    ).getFullName();

    listScheduleExam[i].subjectName = subjectName;
    listScheduleExam[i].roomName = `${roomName}-${schedule.roomID}`;
    listScheduleExam[i].supervisor1 = supervisor1;
    listScheduleExam[i].supervisor2 = supervisor2;
    listScheduleExam[i].dayExam = `${dayExam.getDate()}/${
      dayExam.getMonth() + 1
    }/${dayExam.getFullYear()}`;
    listScheduleExam[i].dayExamInput = `${
      dayExam.getMonth() + 1
    }/${dayExam.getDate()}/${dayExam.getFullYear()}`;
    listScheduleExam[i].dataTarget = `dataTarget${i}`;
    listScheduleExam[i].statusSemester = statusSemester;
  }

  res.render("staff/examTable", {
    title: "Lịch thi học kì",
    style: ["styleTable.css"],
    user: req.user,
    allYearSemester,
    isLastSemester,
    statusSemester,
    year: `${yearStart}-${yearEnd}`,
    semesterID,
    listScheduleExam,
    listClaSs,
    claSs,
  });
};

module.exports = getExam;
