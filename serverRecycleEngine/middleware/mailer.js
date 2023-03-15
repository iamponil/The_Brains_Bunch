const config = require("../config.json");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "esprit",
  auth: {
    user: config.email,
    pass: config.password,
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./utils/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./utils/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

var mailOptions = {
  from: '"RecycleEngine" <zwayten.test@gmail.com>', // sender address
  to: "ameur.nemlaghi@esprit.tn",
  cc: "klai.ghassen@esprit.tn", // list of receivers
  subject: "Welcome!",
  template: "complaint-mail-template", // the name of the template file i.e email.handlebars
  context: {
    name: "Adebola", // replace {{name}} with Adebola
    company: "RecycleEngine", // replace {{company}} with My Company
  },
};

// trigger the sending of the E-mail
exports.complaintMail = function () {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};
