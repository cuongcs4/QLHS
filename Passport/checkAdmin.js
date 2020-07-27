const flagClass = require("../ModelClass/MiniServices/Flag");

const checkAdmin = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.ADMIN) {
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkAdmin;
