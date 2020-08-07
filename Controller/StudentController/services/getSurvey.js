const Survey = require("../../../ModelClass/Class/QuestionSurvey");
const ResultSurvey = require("../../../ModelClass/Class/ResultSurvey");
const Semester = require("../../../ModelClass/Class/Semester");

const getSurvey = async (req, res, next) => {
  const latestSemester = await Semester.getLatestSemester();
  semesterID = latestSemester.getSemesterID();
  yearStart = latestSemester.getYearStart();
  yearEnd = latestSemester.getYearEnd();
  const survey = await ResultSurvey.GetTimeSurvey(
    semesterID,
    yearStart,
    yearEnd
  );
  let boolean = true;
  const today = new Date();
  if (today < survey.dayStart) {
    boolean = false;
    error = "Chưa có đợt khảo sát";
  }
  if (today > survey.dayEnd) {
    boolean = false;
    error = "Đợt khảo sát đã kết thúc";
  }
  // Kiểm tra hs đã làm khảo sát chưa
  const check = await ResultSurvey.Find();
  if (check !== null) {
      for (let i=0; i<check.length; i++){
          if (check[i].studentID === req.user.id){
              error = "Bạn đã làm khảo sát";
              boolean = false;
          }
      }
  }
  
  const listQuestionsView = [];
  if (boolean == true) {
    const listQuestions = await Survey.Find();
    if (listQuestions.length !== null) {
      for (let i = 0; i < listQuestions.length; i++) {
        const id = listQuestions[i].idQuestion;
        const content = listQuestions[i].content;
        listQuestionsView.push({ id, content });
      }
    }
    res.render("student/survey", {
      title: "Khảo sát",
      style: ["styleSurvey.css"],
      user: req.user,
      listQuestionsView
    });
  }
  else {
    res.render("student/survey", {
        title: "Khảo sát",
        style: ["styleSurvey.css"],
        user: req.user,
        error
      });
  }
};

module.exports = getSurvey;
