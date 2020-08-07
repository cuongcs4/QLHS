const User = require("../../../ModelClass/Class/User");
const bcrypt = require("bcrypt");
const postChangePassword = async (req, res, next) => {
  console.log(req.body);
  const { username, currentPassword, newPassword1, newPassword2 } = req.body;
  var boolean = true;
  const user = await User.Find(username);
  const saltRounds = 10;

  if (!bcrypt.compareSync(currentPassword, user.password)) {
    req.flash("error_msg", "Mật khẩu cũ không trùng khớp");
    boolean = false;
  }
  if (newPassword1 === currentPassword) {
    req.flash("error_msg", "Mật khẩu mới không được trùng mật khẩu cũ");
    boolean = false;
  }
  if (newPassword1 !== newPassword2) {
    req.flash("error_msg", "Mật khẩu mới không trùng khớp");
    boolean = false;
  }
  if (boolean == true) {
    hash = bcrypt.hashSync(newPassword1, saltRounds);
    user.setPassWord(hash);
    console.log(hash);
    await User.Changepassword(user);
    req.flash("success_msg", "Đổi mật khẩu thành công");
  }
  res.redirect("/changePassword");
};

module.exports = postChangePassword;
