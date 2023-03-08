const express = require("express");
const router = express.Router();
const User = require("../models/user");
const SecretCode = require("../models/SecretCode");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
exports.getAll = async (req, res, next) => {
  const search = req.query.query;
  try {
    User.find({ $or: [{ role: 1 }, { role: 2 }] })
      .populate("complaint product")
      .then((usersdata) => {
        if (search != null && search != "") {
          let users = usersdata.filter((w) => w.name.includes(search));
          res.json(users);
        } else {
          res.json(usersdata);
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllClients = async (req, res) => {
  const search = req.query.query;
  try {
    User.find({ role: 2 })
      .populate("complaint product")
      .then((usersdata) => {
        if (search != null && search != "") {
          let users = usersdata.filter((w) => w.name.includes(search));
          res.json(users);
        } else {
          res.json(usersdata);
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res, next) => {
  const user = req.body;
  bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(user.password, salt, async function(err, hash) {
 if (err) {
  return next(err);
  }
  user.password = hash;
  const userDb = new User(user);
  try {
    const user = await userDb.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }  });
    })
 
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "complaint project"
    );
    if (user == null) {
      return res.status(304).json({ message: "cannot find user" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOneById = async (req, res, next) => {
  try {
    user = await User.findById(req.params.id).populate("complaint project");
    if (user == null) {
      return res.status(404).json({ message: "cannot find user " });
    }
    res.user = user;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
};

exports.getByName = async (req, res) => {
  try {
    const user = await User.find({ name: req.params.name }).populate(
      "complaint project"
    );
    if (user == null || user.length == 0) {
      return res.status(304).json({ message: "cannot find user" });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await res.user.remove();
    res.json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await user.remove({});
    res.json({ message: "All user are deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateUser = async (req, res) => {
  console.log(req.body);
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.phone_number != null) {
    res.user.phone_number = req.body.phone_number;
  }
  if (req.body.address != null) {
    res.user.address = req.body.address;
  }
  try {
    res.user.save().then((updatedUser) => {
      res.json(updatedUser);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
async function SendMail(user, code) {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
   port: 465,
   secure: true,
    auth: {
      user: "thebrainsbrunch41@gmail.com",
      pass: "aufdccimtrwxoslh",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Message object
  let message = {
    from: "thebrainsbrunch41@gmail.com",
    to: user.email,
    // Subject of the message
    subject: "Récuprération du mot de passe",
    // plaintext body
    // text: msg,
    html: `<div>
            <p><strong>Bonjour ${user.name}</strong></p>\
             <br>
             <p> Veuillez trouver ici le code de récupération de votre mot de passe : <span style="font-weight:500"> <strong>${code} </strong></span> </p>
             </div>`,
  };

  await transporter.sendMail(message, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
  transporter.close();
}
//send secret code to mail
exports.resetPassword=async (req, res) => {
  try {
    // Get email from req.body
    const { email } = req.body;

    // Check user
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(400).send({ msg: "Compte non trouvé" });
    }

    // Generate Secret Code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Save code in DB with user id
    const newcode = new SecretCode({ user: finduser, code });
    await newcode.save();
    // Send Email to user
    SendMail(finduser, code);
    res
      .status(200)
      .send({ msg: "Veuillez consulter votre email pour la récupération du code" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Récupération du mot de passe échouée", error });
  }
}


//submit secret code from mail
exports.checkSecretCode=async (req, res) => {
  try {
    // Get secret code from req.body
    const { code } = req.body;
    // find secret code
    const findcode = await SecretCode.findOne({ code })
      .populate("user")
      .sort({ _id: -1 })
      .limit(1);
    if (!findcode) {
      return res.status(400).send({ msg: "Code invalide !" });
    }
    // send ok
    res.status(200).send({ msg: "Code Valid", findcode });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Vérification du code échouée", error });
  }
}


//reset new password
exports.resetNewPassword= async (req, res) => {
  try {
    // Get new and confirm password from req.body
    const { newpass, confirmpass } = req.body;
    // Get user id from req.params
    const { id } = req.params;
    // Check if 2 password is equal
    if (newpass !== confirmpass) {
      return res.status(400).send({ msg: "Les mots de passe ne sont pas identiques" });
    }
    // replace password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newpass, salt);
    await User.updateOne({ _id: id }, { $set: { password: hashedpassword } });

    res.status(200).send({ msg: "Mot de passe changé !"});
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Changement du mot de passe echoué", error });
  }
}
// //SignUp

// router.post(
//   "/signup",
//   [
//     check("name", "Veuillez insérer votre nom").not().isEmpty(),
//     // check("firstname", "Veuillez insérer votre prenom").not().isEmpty(),
//     check("email", "Veuillez insérer votre adresse email").not().isEmpty(),
//     check(
//       "password",
//       "Veuillez insérer votre mot de passe avec un minimum de 6 caractères"
//     ).isLength({ min: 6 }),
//   //   check("cin", "Veuillez insérer votre numèro de carte d'identité").not().isEmpty(),
//   //   check("tel", "Veuillez insérer votre numèro de telephone").not().isEmpty(),
//   //   check("adresse", "Veuillez insérer votre adresse").not().isEmpty(),
//    ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const { name,  email,  password} = req.body;

//       let user = await User.findOne({ email });
//       if (user) {
//         return res
//           .status(400)
//           .send({ errors: [{ msg: "Utilisateur existe déjà" }] });
//       }
      
//       user = new User({
//         name,  email,  password
//       });
//       const salt = await bcrypt.genSalt(10);

//       user.password = await bcrypt.hash(password, salt);
//       await user.save();
//       const payload = {
//         id: user.id,
//       };

//       // create a token using json webtoken
//       const token = jwt.sign(payload, process.env.SECRET_KEY, {
//         expiresIn: "2h",
//       });
//       res.status(200).send({ user, token });
//     } catch (err) {
//       console.error(err.message);
//       res.status(400).send({ errors: [{ msg: "Création du compte échoué", error: err }] });
//     }
//   }
// );