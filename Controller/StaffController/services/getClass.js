const getClass = async (req, res, next) => {
  res.render("staff/classTable", {
    title: "Class Table",
    style: ["styleTable.css"],
    user: req.user,
  });
};

module.exports = getClass;
