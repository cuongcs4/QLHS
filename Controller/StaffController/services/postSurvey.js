const ResultSurvey = require("../../../ModelClass/Class/ResultSurvey");

const postSurvey = async (req, res, next) => {
  const { semesterID, year, dayStart, dayEnd } = req.body;

  const yearArray = year.split("-");
  const yearStart = yearArray[0];
  const yearEnd = yearArray[1];

  await ResultSurvey.CreateSurvey(
    semesterID,
    yearStart,
    yearEnd,
    dayStart,
    dayEnd
  );

  req.flash("success_msg", "Tạo đợt khảo sát thành công.");
  res.redirect("/staff/survey");
};

module.exports = postSurvey;
