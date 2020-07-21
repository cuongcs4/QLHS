const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const controllerMiniService = require("../ModelClass/MiniServices/ControllerMiniService");
const flagClass = require("../ModelClass/MiniServices/Flag");

const configPassport = (passport) => {
  console.log("Config Passport");

  passport.serializeUser(function (user, done) {
    done(null, user.getID());
  });

  passport.deserializeUser(async (id, done) => {
    console.log(id);
    const user = await controllerMiniService.getUserByUsername(id);

    console.log(user);

    if (user !== null) return done(null, user);

    console.log("error deserializeUser");
    return done(null, false, {
      message: "Incorrect username and password",
    });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await controllerMiniService.getUserByUsername(username);

      if (user === null) {
        console.log("error");
        return done(null, false, {
          message: "Incorrect username and password",
        });
      }

      console.log(user.getStatus());
      if (user.getStatus() === flagClass.STATUS_USER.DISABLE) {
        return done(null, false, {
          message: "Incorrect username and password",
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
