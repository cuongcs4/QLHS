var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("express-handlebars");
var expressValidator = require("express-validator");
var expressSession = require("express-session");

var indexRouter = require("./routes/index.js");
var staffRouter = require("./routes/staff.js");
var adminRouter = require("./routes/admin.js");
var studentRouter = require("./routes/student.js");
var teacherRouter = require("./routes/teacher.js");
const { SSL_OP_LEGACY_SERVER_CONNECT } = require("constants");

require("dotenv").config();

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
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    secret: "max",
    saveUninitialized: SSL_OP_LEGACY_SERVER_CONNECT,
    resave: false,
  })
);

app.use("/", indexRouter);
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
  });
});

module.exports = app;
