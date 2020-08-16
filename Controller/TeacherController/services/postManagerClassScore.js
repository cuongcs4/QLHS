const Semester = require("../../../Model/Class/Semester");
const Conduct = require("../../../Model/Class/Conduct");

const postManagerClassScore = async (req, res, next) => {
  const { studentID, conduct } = req.body;
  const latestSemester = await Semester.getLatestSemester();

  const { classID, id } = req.user;

  const newConduct = new Conduct(
    latestSemester,
    studentID,
    classID,
    id,
    conduct
  );

  Conduct.Save(newConduct);

  req.flash("success_msg", "Thành công.");
  res.redirect("/teacher/managerClass/score");
};

module.exports = postManagerClassScore;
