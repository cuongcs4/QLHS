const ResultSurvey = require("../../../Model/Class/ResultSurvey");
const Semester = require("../../../Model/Class/Semester");
const postSurvey = async (req, res, next) => {
  const semester = await Semester.getLatestSemester();
  const listAnswers = req.body;
  const studentID = req.user.id;

  const answer = [
    listAnswers.answer1,
    listAnswers.answer2,
    listAnswers.answer3,
    listAnswers.answer4,
    listAnswers.answer5,
    listAnswers.answer6,
    listAnswers.answer7,
    listAnswers.answer8,
    listAnswers.answer9,
    listAnswers.answer10,
  ];

  console.log(answer);

  for (let i = 1; i <= 10; i++) {
    const resultSurvey = new ResultSurvey(
      semester,
      studentID,
      i,
      parseInt(answer[i - 1]) + 1
    );
    await ResultSurvey.Save(resultSurvey);
  }
  req.flash("success_msg", "Đã hoàn thành khảo sát");
  res.redirect("/student/survey");
};

module.exports = postSurvey;
