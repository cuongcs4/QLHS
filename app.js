require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");
const handlebars = require("handlebars");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");

const configPassport = require("./Passport/Config");
configPassport(passport);

const indexRouter = require("./routes/index.js");
const staffRouter = require("./routes/staff.js");
const adminRouter = require("./routes/admin.js");
const studentRouter = require("./routes/student.js");
const teacherRouter = require("./routes/teacher.js");
const authenticateRouter = require("./routes/authenticate");
const { SSL_OP_LEGACY_SERVER_CONNECT } = require("constants");
const { authenticate } = require("passport");
const registerAll = require("./HandlebarHelper/register");
registerAll(handlebars);

var app = express();

// view engine setup
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  expressSession({
    secret: "max",
    saveUninitialized: SSL_OP_LEGACY_SERVER_CONNECT,
    resave: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRouter);
app.use("/login", authenticateRouter);
app.use("/staff", staffRouter);
app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/teacher", teacherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: err,
    user: req.user,
  });
});

module.exports = app;
