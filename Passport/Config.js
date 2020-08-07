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

    if (user !== null) {
      if (user.getStatus() === flagClass.STATUS.DISABLE) {
        return done(null, false, {
          message: "Tài khoản đã bị khóa",
        });
      } else {
        return done(null, user);
      }
    }

    console.log("error deserializeUser");
    return done(null, false, {
      message: "Không tồn tại tài khoản",
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
      } else {
        //return done(null, user);

        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            return done(err);
          }
          if (!result) {
            return done(null, false, {
              message: "Mật khẩu không chính xác!",
            });
          }

          return done(null, user);
        });
      }
    })
  );
};

module.exports = configPassport;

const ExecuteSQL = require("../ModelClass/Database/ExecuteSQL");

// async function exec() {
//   const sqlQuery = `SELECT * FROM NGUOIDUNG `;

//   const user = await ExecuteSQL(sqlQuery);

//   const salt = 10;

//   //console.log(user);

//   for (let i = 0; i < user.length; i++) {
//     let password = "";

//     switch (user[i].loai) {
//       case flagClass.TYPE_USER.STUDENT:
//         password = user[i].cmnd;
//         break;

//       case flagClass.TYPE_USER.TEACHER:
//       case flagClass.TYPE_USER.ADMIN:
//       case flagClass.TYPE_USER.ADMIN:
//       case flagClass.TYPE_USER.HOMEROOM_TEACHER:
//         password = user[i].tenDangNhap;
//         break;
//     }
//     const hash = bcrypt.hashSync(password, salt);

//     //save

//     const sql = `UPDATE NGUOIDUNG SET matKhau='${hash}' WHERE tenDangNhap='${user[i].tenDangNhap}'`;

//     ExecuteSQL(sql);
//   }
// }
