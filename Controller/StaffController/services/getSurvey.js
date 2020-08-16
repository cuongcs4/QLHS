const Semester = require("../../../Model/Class/Semester");
const ResultSurvey = require("../../../Model/Class/ResultSurvey");
const Student = require("../../../Model/Class/Student");
const QuestionSurvey = require("../../../Model/Class/QuestionSurvey");

const handleSemester = require("../../../Model/Helper/services/handleSemester");

const getSurvey = async (req, res, next) => {
  const { year, semester } = req.query;
  const error_msg = [];

  let statusSemester, semesterID, yearStart, yearEnd;

  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  if (typeof year === "undefined" || typeof semester === "undefined") {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
    statusSemester = latestSemester.getStatus();
  } else {
    const yearArray = year.split("-");
    semesterID = parseInt(semester);
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);

    let semesterTemp = await Semester.Find(semesterID, yearStart, yearEnd);
    if (!semesterTemp) {
      error_msg.push(
        `Học kỳ ${semesterID} năm học ${yearStart}-${yearEnd} chưa có dữ liệu.`
      );

      semesterTemp = await Semester.getLatestSemester();
      semesterID = semesterTemp.getSemesterID();
      isLastSemester = false;
    }

    statusSemester = semesterTemp.getStatus();
  }

  let timeSurvey = await ResultSurvey.GetTimeSurvey(
    semesterID,
    yearStart,
    yearEnd
  );

  const isExistSurvey = timeSurvey === null ? false : true;

  let isDuringSurvey = { condition: isExistSurvey && true, msg: "" };
  if (isExistSurvey) {
    const day = new Date();
    const date = new Date(
      `${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()}`
    );

    const { dayStart, dayEnd } = timeSurvey;

    if (dayStart > date) {
      isDuringSurvey.condition = false;
      isDuringSurvey.msg = "Chưa bắt đầu";
    }

    if (dayEnd < date) {
      isDuringSurvey.condition = false;
      isDuringSurvey.msg = "Đã kết thúc";
    }

    timeSurvey = `${dayStart.getDate()}/${
      dayStart.getMonth() + 1
    }/${dayStart.getFullYear()} - ${dayEnd.getDate()}/${
      dayEnd.getMonth() + 1
    }/${dayEnd.getFullYear()}`;
  }

  //Lấy tổng số học sinh
  const sumStudent = await Student.CountStudent();
  //Lấy số phiếu đã làm
  const sumSurvey = await ResultSurvey.CountStudentDoSurvey(
    semesterID,
    yearStart,
    yearEnd
  );

  //Lấy toàn bộ câu hỏi:
  const allQuestion = (await QuestionSurvey.Find()) || [];

  //Lấy kết quả khảo sát.
  const resultSurvey =
    (await ResultSurvey.Find(semesterID, yearStart, yearEnd)) || [];

  //Phân loại theo từng câu
  const question = {
    question1: {
      id: "question1",
      questionID: "Câu 1",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question2: {
      id: "question2",
      questionID: "Câu 2",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question3: {
      id: "question3",
      questionID: "Câu 3",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question4: {
      id: "question4",
      questionID: "Câu 4",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question5: {
      id: "question5",
      questionID: "Câu 5",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question6: {
      id: "question6",
      questionID: "Câu 6",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question7: {
      id: "question7",
      questionID: "Câu 7",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question8: {
      id: "question8",
      questionID: "Câu 8",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question9: {
      id: "question9",
      questionID: "Câu 9",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question10: {
      id: "question10",
      questionID: "Câu 10",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
  };

  //Thêm mã câu hỏi, nội dung câu hỏi.
  for (let i = 0; i < allQuestion.length; i++) {
    question[`question${allQuestion[i].idQuestion}`].content =
      allQuestion[i].content;
  }

  //Đếm, phân loại
  for (let i = 0; i < resultSurvey.length; i++) {
    question[`question${resultSurvey[i].idQuestion}`].quantity[
      `type${resultSurvey[i].answer}`
    ]++;
  }

  //Tính %
  for (let i in question) {
    const { type1, type2, type3, type4 } = question[i].quantity;

    const sum = type1 + type2 + type3 + type4;

    question[i].percent.type1 = Math.round((type1 / sum) * 100) || 0;
    question[i].percent.type2 = Math.round((type2 / sum) * 100) || 0;
    question[i].percent.type3 = Math.round((type3 / sum) * 100) || 0;
    question[i].percent.type4 = Math.round((type4 / sum) * 100) || 0;
  }

  const questionArray = Object.keys(question).map((key) => question[key]);

  //res.send(questionArray);

  res.render("staff/survey", {
    title: "Khảo sát",
    style: ["styleTable.css"],
    user: req.user,
    allYearSemester,
    isLastSemester,
    statusSemester,
    timeSurvey,
    isDuringSurvey,
    semesterID,
    year: `${yearStart}-${yearEnd}`,
    sumStudent,
    sumSurvey,
    questionArray,
    error_msg,
  });
};

module.exports = getSurvey;
