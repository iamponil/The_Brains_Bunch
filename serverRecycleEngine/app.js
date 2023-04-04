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
  cookieSession({
    secret: "changeme",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      secure: false,
      maxAge: 5 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
// const corsOptions ={
//   origin:"*", 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
const frontEndDomain = 'http://localhost:3000';
const backEndDomain = 'http://localhost:3001';

app.use(cors({
  origin: [frontEndDomain, backEndDomain],
  optionsSuccessStatus: 200,
  credentials: true
}));

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

module.exports = app;
