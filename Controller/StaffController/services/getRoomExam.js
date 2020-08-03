const getRoomExam = (req, res, next) => {
  res.render("staff/examRoom_studentListTable", {
    title: "Danh sách thí sinh",
    style: ["styleTable.css"],
    user: req.user,
  });
};

module.exports = getRoomExam;
