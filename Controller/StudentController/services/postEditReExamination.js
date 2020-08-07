const ReExamine = require("../../../ModelClass/Class/ReExamination");

const getEditReExamination = async (req, res, next) => {
  const { id, content } = req.body;
  const reExamine = await ReExamine.Find({
    studentID: null,
    teacherID: null,
    ID: id,
  });
  reExamine.setContent(content);
  await ReExamine.Save(reExamine);
  req.flash("success_msg", "Đã cập nhật");

  res.redirect(`/student/reExamination`);
};
module.exports = getEditReExamination;
