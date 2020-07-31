const getReExamination = async (req, res, next) => {
  //Lấy các đơn phúc khảo

  //

  res.render("teacher/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"],
    user: req.user,
  });
};

module.exports = getReExamination;
