const getReport = (req, res, next) => {
  res.render("staff/report", {
    title: "Báo cáo",
    style: ["styleTable.css"],
    user: req.user,
  });
};

module.exports = getReport;
