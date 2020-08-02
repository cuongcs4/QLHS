const getSurvey = (req, res, next) => {
  res.render("staff/examRoomTable", {
    title: "Khảo sát",
    style: ["styleTable.css"],
    user: req.user,
  });
};

module.exports = getSurvey;
