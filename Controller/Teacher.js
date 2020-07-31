const Formidable = require("formidable");

const Class = require("../ModelClass/Class/Class");
const Room = require("../ModelClass/Class/Room");
const Teacher = require("../ModelClass/Class/Teacher");
const TeachingPlan = require("../ModelClass/Class/TeachingPlan");
const Student = require("../ModelClass/Class/Student");
const Semester = require("../ModelClass/Class/Semester");
const Score = require("../ModelClass/Class/Score");
const Conduct = require("../ModelClass/Class/Conduct");

const flagClass = require("../ModelClass/MiniServices/Flag");
const formatFileExcel = require("../ModelClass/MiniServices/formatFileExcel");
const parseFileExcel = require("../ModelClass/MiniServices/parseFileExcel");
const handleSemester = require("../ModelClass/MiniServices/handleSemester");

const util = require("util");
const { stat } = require("fs");

const parseForm = async (req) => {
  const form = new Formidable.IncomingForm();
  const formParse = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ path: files.fileExcel.path, fields: fields });
    });
  });

  return formParse;
};

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

const postStudentInClass = async (req, res, next) => {
  const classID = req.params.classID;
  console.log("Hello");
  const { studentID, score1, score2, score3, score4 } = req.body;

  const latestSemester = await Semester.getLatestSemester();
  const { semesterID, yearStart, yearEnd } = latestSemester;

  const subjectID = req.user.getSubjectID();
  const teacherID = req.user.getID();

  const score = new Score(
    latestSemester,
    studentID,
    teacherID,
    classID,
    subjectID,
    score1,
    score2,
    score3,
    score4
  );

  await Score.Save(score);

  req.flash("success_msg", "Thành công.");
  res.redirect(
    `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
  );
};

const postStudentInClassExcel = async (req, res, next) => {
  const form = await parseForm(req);

  const path = form.path;
  const { classID } = form.fields;

  const { data, err } = parseFileExcel(path, formatFileExcel.scoreFormat);

  const latestSemester = await Semester.getLatestSemester();
  const { semesterID, yearStart, yearEnd } = latestSemester;

  //Kiểm tra nếu có lỗi
  if (err.length !== 0) {
    req.flash("error_msg", err);
    res.redirect(
      `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
    );
  }

  //Kiểm tra nếu không có dữ liệu
  if (data.length === 0) {
    req.flash("error_msg", "Vui lòng kiểm tra lại file, file rỗng");
    res.redirect(
      `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
    );
  }

  //Kiểm tra có trùng khớp lơp hay không
  for (let i = 0; i < data.length; i++) {
    const studentID = data[i].studentId;
    const classIDStudent = `LH${studentID.slice(2, 8)}`;

    if (classID !== classIDStudent) {
      req.flash(
        "error_msg",
        `Mã học sinh không đúng. (Hàng ${i + 1}, MHS: ${studentID})`
      );
      res.redirect(
        `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
      );
    }
  }

  //Tiến hành cập nhật điểm cho học sinh.
  const subjectID = req.user.getSubjectID();
  const teacherID = req.user.getID();

  for (let i = 0; i < data.length; i++) {
    const { studentId, score1, score2, score3, score4 } = data[i];

    if (
      score1 < 0 ||
      score2 < 0 ||
      score3 < 0 ||
      score4 < 0 ||
      score1 > 10 ||
      score2 > 10 ||
      score3 > 10 ||
      score4 > 10
    ) {
      req.flash(
        "error_msg",
        `Điểm không hợp lệ. (Hàng ${i + 1}, MHS: ${studentId})`
      );
      res.redirect(
        `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
      );
    } else {
      const score = new Score(
        latestSemester,
        studentId,
        teacherID,
        classID,
        subjectID,
        score1,
        score2,
        score3,
        score4
      );

      Score.Save(score);
    }
  }

  req.flash("success_msg", "Thành công.");
  res.redirect(
    `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
  );
};

const getStudentInClass = async (req, res, next) => {
  const classID = req.params.classID;

  //Lấy các tham số từ query string url, nếu không có thì chuyển hướng về và thông báo lỗi.
  const { year, semester } = req.query;
  if (typeof year == "undefined" && typeof semester == "undefined") {
    req.flash("error_msg", "Vui lòng không truy cập trái phép.");
    res.redirect("/teacher/class");
  }

  //Phân tách year (type: string) => yearStart & yearEnd (type: number)
  //Chuyển semester (type: string) => semesterID (type: number)
  const yearArray = year.split("-");
  const yearStart = parseInt(yearArray[0]);
  const yearEnd = parseInt(yearArray[1]);
  const semesterID = parseInt(semester);

  //Lấy danh sách các lớp học mà giáo viên dạy trong học kỳ
  const listClass = await req.user.getClass(semesterID, yearStart, yearEnd);

  //Kiểm tra giáo viên có dạy lớp "classID" trong học kỳ đã truyền vào hay không?
  //Nếu không thì tiến hành chuyển hướng và thông báo lỗi
  let isTrue = true;

  for (let i = 0; i < listClass.length; i++) {
    if (classID === listClass[i].classID) {
      isTrue = false;
      break;
    }
  }

  if (isTrue === true) {
    req.flash(
      "error_msg",
      `Bạn không dạy lớp ${classID} trong học kỳ ${semester}, năm học ${yearStart}-${yearEnd}`
    );
    req.flash("error_msg", `Vui lòng không truy cập trái phép.`);
    res.redirect("/teacher/class");
  } else {
    //Nếu không lỗi thì tiến hành lấy danh sách điểm để hiển thị

    //Lấy trạng thái của học kỳ
    // => Mục đích: có hiển thị nút chỉnh sửa điểm hay không
    //Nếu trạng thái của học kỳ là 0 (~disable: học kỳ đã đóng) thì không hiển thị nút chỉnh sửa điểm
    //Nếu trạng thái của học kỳ là 1 (~enable: học kỳ còn đang mở) thì cho phép sửa điểm.
    const statusSemester = (
      await Semester.Find(semesterID, yearStart, yearEnd)
    ).getStatus();

    //Tạo action cho các form
    const actionForm = `/teacher/class/${classID}`;
    const actionFormExcel = `/teacher/class/excel/${classID}`;

    const managerClassID = (await Class.Find(classID)).getManagerClass();
    const managerClassName = (await Teacher.Find(managerClassID)).getFullName();
    const className = await Class.GetClassName(classID);

    //Lấy danh sách điểm của học sinh
    const listScores = await req.user.getScore(classID);

    //Xử lý điểm đã lấy để hiển thị
    const listScoreView = [];

    for (let i = 0; i < listScores.length; i++) {
      const result = await Student.Find({
        id: listScores[i].studentID,
        classID: null,
      });

      const { studentID, score1, score2, score3, score4 } = listScores[i];

      const student = {
        id: i + 1,
        studentID,
        fullName: result.fullName,
        score1,
        score2,
        score3,
        score4,
        dataTarget: `modalScoreEditHS${i + 1}`,
        statusSemester,
      };

      student.gpa =
        Math.round((10 * (score1 + score2 + 2 * score3 + 3 * score4)) / 7) / 10;
      listScoreView.push(student);
    }

    //Render kết quả
    res.render("teacher/score", {
      title: `Lớp học ${className} (${classID})`,
      style: ["styleTable.css"],
      user: req.user,
      listScoreView,
      actionForm,
      actionFormExcel,
      year,
      semesterID,
      managerClassName,
      className,
      classID,
      statusSemester,
    });
  }
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
  let semesterID, yearStart, yearEnd, statusSemester;

  if (typeof year != "undefined") {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);

    try {
      statusSemester = (
        await Semester.Find(semesterID, yearStart, yearEnd)
      ).getStatus();
    } catch {
      statusSemester = 0;
    }
  } else {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
    statusSemester = latestSemester.getStatus();
  }

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  //Lấy mã lớp và tên lớp.
  const classID = req.user.getClassID();
  const className = await Class.GetClassName(classID);

  //Lấy danh sách học sinh
  const listStudent = await Student.Find({ id: null, classID: classID });

  //Lấy danh sách điểm của học sinh
  const listScore = [];

  for (let i = 0; i < listStudent.length; i++) {
    const student = {
      fullName: listStudent[i].getFullName(),
      id: i + 1,
      isFill: i % 2 !== 0 ? true : false,
      dataTarget: `modalScoreEditHS${i + 1}`,
      studentID: listStudent[i].getID(),
      statusSemester,
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
      student[`${scores[j].subjectID}`] =
        Math.round(student[`${scores[j].subjectID}`] * 10) / 10;
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
    student[`conductNumber`] = await listStudent[i].getConduct(
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

    switch (student[`conductNumber`]) {
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

  //Render kết quả
  res.render("teacher/managerClassScore", {
    title: `Quản lý lớp chủ nhiệm ${className}`,
    style: ["styleTable.css"],
    user: req.user,
    listScore,
    allYearSemester,
    isLastSemester,
    className,
    classID,
    managerClassName: req.user.getFullName(),
    statusSemester,
  });
};

const postManagerClassScore = async (req, res, next) => {
  const { studentID, conduct } = req.body;
  const latestSemester = await Semester.getLatestSemester();

  const newConduct = new Conduct(latestSemester, studentID, conduct);

  Conduct.Save(newConduct);

  req.flash("success_msg", "Thành công.");
  res.redirect("/teacher/managerClass/score");
};

const postManagerClassScoreExcel = async (req, res, next) => {
  // const { studentID, conduct } = req.body;
  // const latestSemester = await Semester.getLatestSemester();

  // const newConduct = new Conduct(latestSemester, studentID, conduct);

  // Conduct.Save(newConduct);

  // req.flash("success_msg", "Thành công.");
  // res.redirect("/teacher/managerClass/score");

  const { path, fields } = await parseForm(req);

  const { classID } = fields;

  const { data, err } = parseFileExcel(path, formatFileExcel.conductFormat);

  //Kiểm tra nếu có lỗi
  if (err.length !== 0) {
    req.flash("error_msg", err);
    res.redirect(`/teacher/managerClass/score`);
  }

  //Kiểm tra nếu không có dữ liệu
  if (data.length === 0) {
    req.flash("error_msg", "Vui lòng kiểm tra lại file, file rỗng");
    res.redirect(`/teacher/managerClass/score`);
  }

  //Kiểm tra có trùng khớp lơp hay không
  for (let i = 0; i < data.length; i++) {
    const studentID = data[i].studentId;
    const classIDStudent = `LH${studentID.slice(2, 8)}`;

    switch (data[i].grade.toLowerCase()) {
      case "tốt":
        data[i].grade = flagClass.CONDUCT.TYPE_1;
        break;
      case "khá":
        data[i].grade = flagClass.CONDUCT.TYPE_2;
        break;
      case "tb":
        data[i].grade = flagClass.CONDUCT.TYPE_3;
        break;
      case "yếu":
        data[i].grade = flagClass.CONDUCT.TYPE_4;
        break;

      default:
        req.flash(
          "error_msg",
          `Loại hạnh kiểm không đúng. (Hàng ${i + 1}, MHS: ${studentID})`
        );
        req.flash("error_msg", `Các loại: tốt - khá - tb - yếu`);
        res.redirect(`/teacher/managerClass/score`);
    }

    if (classID !== classIDStudent) {
      req.flash(
        "error_msg",
        `Mã học sinh không đúng. (Hàng ${i + 1}, MHS: ${studentID})`
      );
      res.redirect(`/teacher/managerClass/score`);
    }
  }

  console.log(data);

  //Tiến hành cập nhật
  const latestSemester = await Semester.getLatestSemester();

  for (let i = 0; i < data.length; i++) {
    const { studentId, grade } = data[i];
    const newConduct = new Conduct(latestSemester, studentId, grade);

    Conduct.Save(newConduct);
  }

  req.flash("success_msg", "Thành công.");
  res.redirect("/teacher/managerClass/score");
};

const getReExamination = async (req, res, next) => {
  //Lấy các đơn phúc khảo

  //

  res.render("teacher/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"],
    user: req.user,
  });
};

module.exports = {
  getScheduleExam,
  getSchedule,
  getClass,
  getManagerClass,
  getManagerClassScore,
  postStudentInClass,
  postStudentInClassExcel,
  postManagerClassScore,
  postManagerClassScoreExcel,
  getStudentInClass,
  getReExamination,
};
