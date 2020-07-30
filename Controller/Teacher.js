const handleSemester = require("../ModelClass/MiniServices/handleSemester");
const Class = require("../ModelClass/Class/Class");
const Room = require("../ModelClass/Class/Room");
const Teacher = require("../ModelClass/Class/Teacher");
const Student = require("../ModelClass/Class/Student");
const flagClass = require("../ModelClass/MiniServices/Flag");

const getScheduleExam = async (req, res, next) => {
  let { year, semester } = req.query;

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  //Lấy lịch coi thi của giáo viên
  let scheduleExam;

  if (typeof year == "undefined" && typeof semester == "undefined") {
    scheduleExam = await req.user.getScheduleExam();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    scheduleExam = await req.user.getScheduleExam(
      semesterID,
      yearStart,
      yearEnd
    );
  }

  //Sắp xếp lịch thi
  scheduleExam.sort((a, b) => {
    if (a.dayExam < b.dayExam) {
      return -1;
    }

    if (a.dayExam > b.dayExam) {
      return 1;
    }

    // a == b
    return 0;
  });

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
  });
};

const getSchedule = async (req, res, next) => {
  let { year, semester } = req.query;

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let schedule;

  //Lấy thời khóa biểu của giáo viên
  if (typeof year == "undefined" && typeof semester == "undefined") {
    schedule = await req.user.getSchedule();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    schedule = await req.user.getSchedule(semesterID, yearStart, yearEnd);
  }

  //Tạo thời khóa biểu dùng để hiển thị cho view
  const scheduleView = [];

  for (let i = 1; i <= 10; i++) {
    const line = [];
    line.push(i);
    for (let j = 1; j <= 6; j++) {
      line.push("Trống");
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
  });
};

const getClass = async (req, res, next) => {
  let { year, semester } = req.query;

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  //Lấy lịch coi thi của giáo viên
  let listClass;

  if (typeof year == "undefined" && typeof semester == "undefined") {
    listClass = await req.user.getClass();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    listClass = await req.user.getClass(semesterID, yearStart, yearEnd);
  }

  const listClassView = [];
  for (let i = 0; i < listClass.length; i++) {
    const classID = listClass[i].getClassID();
    const className = await Class.GetClassName(classID);
    const roomName = (await Room.Find(listClass[i].getRoomID())).getRoomName();
    const managerName = (
      await Teacher.Find(listClass[i].getManagerClass())
    ).getFullName();

    const linkManager = `/teacher/class/${classID}`;

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

const getStudentInClass = async (req, res, next) => {
  const classID = req.params.classID;

  if (typeof classID == "undefined") res.redirect("/teacher/class");

  //const claSs = await Class.Find(classID);
  const className = await Class.GetClassName(classID);

  const listScores = await req.user.getScore(classID);
  console.log(listScores);

  const listScoreView = [];

  for (let i = 0; i < listScores.length; i++) {
    const student = {
      id: i + 1,
      fullName: listScores[i].studentName,
      studentID: listScores[i].studentID,
      score1: listScores[i].score1,
      score2: listScores[i].score2,
      score3: listScores[i].score3,
      score4: listScores[i].score4,
    };

    listScoreView.push(student);
  }

  res.render("teacher/score", {
    title: `Quản lý lớp học ${className}`,
    style: ["styleTable.css"],
    user: req.user,
    listScoreView,
  });
};

const getManagerClass = async (req, res, next) => {
  const classID = req.user.getClassID();

  const className = await Class.GetClassName(classID);

  const listStudent = await Student.Find({ id: null, classID: classID });

  const listStudentView = [];

  for (let i = 0; i < listStudent.length; i++) {
    const { id, identityCard, fullName, dob, address } = listStudent[i];

    listStudentView.push({
      id: i + 1,
      username: id,
      identityCard,
      fullName,
      dob: `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`,
      address,
    });
  }
  console.log(listStudentView);

  res.render("teacher/managerClass", {
    title: `Quản lý lớp chủ nhiệm ${className}`,
    style: ["styleTable.css"],
    user: req.user,
    listStudentView,
  });
};

const getManagerClassScore = async (req, res, next) => {
  let { year, semester } = req.query;
  let semesterID, yearStart, yearEnd;
  if (typeof year != "undefined") {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);
  }

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  const classID = req.user.getClassID();

  const className = await Class.GetClassName(classID);

  const listStudent = await Student.Find({ id: null, classID: classID });

  const listScore = [];

  for (let i = 0; i < listStudent.length; i++) {
    const student = {
      fullName: listStudent[i].getFullName(),
      id: i + 1,
      isFill: i % 2 !== 0 ? true : false,
    };

    const scores =
      (await listStudent[i].getScore(semesterID, yearStart, yearEnd)) || [];

    for (let j = 0; j < scores.length; j++) {
      student[`${scores[j].subjectID}`] =
        (scores[j].score1 +
          scores[j].score2 +
          2 * scores[j].score3 +
          3 * scores[j].score4) /
        7;
    }

    student[`gpa`] = await listStudent[i].getGPA(
      semesterID,
      yearStart,
      yearEnd
    );
    student[`classify`] = await listStudent[i].classifyAverageScore(
      semesterID,
      yearStart,
      yearEnd
    );
    student[`conduct`] = await listStudent[i].getConduct(
      semesterID,
      yearStart,
      yearEnd
    );

    switch (student[`classify`]) {
      case flagClass.SCORE.TYPE_1:
        student[`classify`] = "giỏi";
        break;

      case flagClass.SCORE.TYPE_2:
        student[`classify`] = "khá";
        break;

      case flagClass.SCORE.TYPE_3:
        student[`classify`] = "tb";
        break;

      case flagClass.SCORE.TYPE_4:
        student[`classify`] = "yếu";
        break;

      case flagClass.SCORE.TYPE_5:
        student[`classify`] = "kém";
        break;
    }

    switch (student[`conduct`]) {
      case flagClass.CONDUCT.TYPE_1:
        student[`conduct`] = "tốt";
        break;

      case flagClass.CONDUCT.TYPE_2:
        student[`conduct`] = "khá";
        break;

      case flagClass.CONDUCT.TYPE_3:
        student[`conduct`] = "tb";
        break;

      case flagClass.CONDUCT.TYPE_4:
        student[`conduct`] = "yếu";
        break;
    }

    listScore.push(student);
  }

  console.log(listScore);

  res.render("teacher/managerClassScore", {
    title: `Quản lý lớp chủ nhiệm ${className}`,
    style: ["styleTable.css"],
    user: req.user,
    listScore,
    allYearSemester,
    isLastSemester,
  });
};

module.exports = {
  getScheduleExam,
  getSchedule,
  getClass,
  getStudentInClass,
  getManagerClass,
  getManagerClassScore,
};
