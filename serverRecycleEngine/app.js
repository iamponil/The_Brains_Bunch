require("dotenv").config();
var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./controller/passport");
const passport = require("passport");
const app = express();
//PassportLogin
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);


app.use(passport.initialize());
app.use(passport.session());

 app.use(
   cors({
     origin: "http://localhost:3000",
     methods: "GET,POST,PUT,DELETE",
     credentials: true,
   })
 );

const authenticateToken = require("./middleware/Authorize");

var usersRouter = require("./routes/users");
var authRoute = require("./routes/authRoute");

const mongoose = require("mongoose");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
 mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DataBase"));
// call routes
app.use("/auth", authRoute);
app.use("/users", usersRouter);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
  
// });

//this function we will call when we need a version of the jwt token

module.exports = app;
