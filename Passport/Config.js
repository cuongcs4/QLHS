const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const controllerMiniService = require("../ModelClass/MiniServices/ControllerMiniService");

const configPassport = (passport) => {
  console.log("Config Passport");

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await controllerMiniService.getUserByID(id);

    if (user) done(null, user);

    console.log("err");
    done(null, "error");
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await controllerMiniService.getUserByUsername(username);
      if (!user) {
        console.log("error");
        done("error");
      }

      return done(null, user);

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return done(err);
        }
        if (!result) {
          return done(null, false, {
            message: "Incorrect username and password",
          });
        }
        return done(null, user);
      });
    })
  );
};

module.exports = configPassport;
