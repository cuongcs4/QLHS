const getExam = (req, res, next) => {
  res.render("staff/examTable", {
    title: "Lịch thi học kì",
    style: ["styleTable.css"],
    user: req.user,
  });
};

module.exports = getExam;
