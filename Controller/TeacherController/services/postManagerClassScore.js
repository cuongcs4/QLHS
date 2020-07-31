const Semester = require("../../../ModelClass/Class/Semester");
const Conduct = require("../../../ModelClass/Class/Conduct");

const postManagerClassScore = async (req, res, next) => {
  const { studentID, conduct } = req.body;
  const latestSemester = await Semester.getLatestSemester();

  const newConduct = new Conduct(latestSemester, studentID, conduct);

  Conduct.Save(newConduct);

  req.flash("success_msg", "Thành công.");
  res.redirect("/teacher/managerClass/score");
};

module.exports = postManagerClassScore;
