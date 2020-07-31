const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const getUserByUsername = require("../ModelClass/Helper/services/GetUserByUsername");
const flagClass = require("../ModelClass/Helper/resource/Flag");

const configPassport = (passport) => {
  console.log("Config Passport");

  passport.serializeUser(function (user, done) {
    done(null, user.getID());
  });

  passport.deserializeUser(async (id, done) => {
    console.log(id);
    const user = await getUserByUsername(id);

    if (user !== null) return done(null, user);

    console.log("error deserializeUser");
    return done(null, false, {
      error_msg: "Incorrect username and password",
    });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await getUserByUsername(username);

      if (user === null) {
        console.log("error user null");
        return done(null, false, {
          message: "Tài khoản không tồn tại",
        });
      }

      if (user.getStatus() === flagClass.STATUS_USER.DISABLE) {
        return done(null, false, {
          message: "Tài khoản đã bị khóa",
        });
      }

      return done(null, user);

      // bcrypt.compare(password, user.password, function (err, result) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!result) {
      //     return done(null, false, {
      //       message: "Incorrect username and password",
      //     });
      //   }

      //   return done(null, user);
      // });
    })
  );
};

module.exports = configPassport;
