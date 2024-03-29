const User = require("../models/user");
const UserModel = require("../models/user");
const SecretCode = require("../models/SecretCode");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const sendMail = require("./sendMail");
const ValidateRegister = require("../validations/Register");
const Address = require("../models/address");

const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
exports.getAllUsers = (req, res) => {
  User.find(function (err, users) {
    res.json(users);
  });
};
exports.getAll = async (req, res, next) => {
  const search = req.query.query;
  try {
    User.find({ $or: [{ role: "RECYCLENGINEAGENT" }, { role: "SUPERADMIN" }] })
      .populate(" project ")
      .then(usersdata => {
        if (search != null && search != "") {
          let users = usersdata.filter(w => w.name.includes(search));
          res.json(users);
        } else {
          res.json(usersdata);
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//send contact us mail
exports.SendContactMail = async (req, res) => {
  // console.log(name,email,msg)

  console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  console.log(req.body.name);
  // Create a SMTP transporter object

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
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
    from: req.body.email,
    to: "thebrainsbrunch41@gmail.com",
    subject: "Message from Contact Form",
    html: `<div>
            <p><strong>Email from: ${req.body.name}</strong></p>
             <br>
             <p>  <strong>Email: ${req.body.email} </strong></span> </p>
             <p>  <strong>Message: ${req.body.msg} </strong></span> </p>
             </div>`,
  };
  try {
    await transporter.sendMail(message, function (error, info) {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Failed to send email. Please try again later." });
      } else {
        console.log("Email sent successfully!");
        res.status(200).json({ message: "Email sent successfully!" });
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
};
exports.getAllClients = async (req, res) => {
  const search = req.query.query;
  try {
    User.find({ role: 2 })
      .populate("complaint product")
      .then(usersdata => {
        if (search != null && search != "") {
          let users = usersdata.filter(w => w.name.includes(search));
          res.json(users);
        } else {
          res.json(usersdata);
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Add User
exports.addUser = async (req, res, next) => {
  User.findOne({ email: req.body.email }).then(async exist => {
    if (exist) {
      return res.status(400).send({ msg: "This email already exists" });
    } else {
      const user = req.body;
      console.log(req.file);
      //user.image = req.file.filename;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async function (err, hash) {
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
          }
        });
      });
    }
  });
};
exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
    user = await User.findById(req.params.id);
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
      "complaint project",
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
    res.user.save().then(updatedUser => {
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
    host: "smtp.gmail.com",
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
exports.resetPassword = async (req, res) => {
  try {
    // Get email from req.body
    const { email } = req.body;

    // Check user
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res
        .status(400)
        .send({ msg: "Compte non trouvé Veuiller entrer un compte existant" });
    }

    // Generate Secret Code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Save code in DB with user id
    const newcode = new SecretCode({ user: finduser, code });
    await newcode.save();
    // Send Email to user
    SendMail(finduser, code);
    res.status(200).send({
      msg: "Veuillez consulter votre email pour la récupération du code",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msg: "Récupération du mot de passe échouée", error });
  }
};

//submit secret code from mail
exports.checkSecretCode = async (req, res) => {
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
};

exports.resetNewPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Get new and confirm password from req.body
    const { newpass, confirmpass } = req.body;
    // Get user id from req.params
    const { id } = req.params;
    // Check if 2 password is equal
    if (newpass != confirmpass) {
      return res
        .status(400)
        .send({ msg: "Les mots de passe ne sont pas identiques" });
    } else if (user) {
      console.log(user.password);
      const match = await bcrypt.compare(newpass, user.password);

      if (!match) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpass, salt);
        //replace password
        await User.updateOne(
          { _id: id },
          { $set: { password: hashedPassword } },
        );
        res.status(200).send({ msg: "Mot de passe changé !" });
      } else {
        return res.status(400).send({
          msg: "Le nouveau mot de passe doit être différent du mot de passe actuel.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Changement du mot de passe echoué", error });
  }
};

exports.addUser1 = async (req, res, next) => {
  const user = req.body;
  user.image = req.file.filename;
  const { errors, isValid } = ValidateRegister(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      const userDb = new User(user);
      try {
        if (!isValid) {
          res.status(405).json(errors);
        } else {
          User.findOne({ email: req.body.email }).then(async exist => {
            if (exist) {
              return res.status(400).send({ msg: "This email already exists" });
            } else {
              const activation_token = createActivationToken(user);
              const url = `http://localhost:3000/activationemail/${activation_token}`;
              const email = req.body.email;
              await sendMail(email, "Activation account", url);

              res.status(200).json({
                messages:
                  "Please activate your account to finish your register process",
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  });
};

exports.activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(activation_token, process.env.ACCESS_TOKEN_SECRET);
    const { name, email, password, phone_number, image } = user;
    const check = await UserModel.findOne({ email: email });
    console.log(user);
    if (check) {
      return res.status(400).json({ msg: "This email already exists" });
    }
    const newUser = new UserModel({
      name,
      email,
      password,
      // confirmPassword,
      phone_number,
      image,
    });
    await newUser.save();
    res.status(200).json({ msg: "Your account has been activated" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ msg: "TokenExpiredError" });
    }
    res.status(550).json(err);
  }
};
const createActivationToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
};
//Update Status User
exports.Bloquage = (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, { status: "BLOCKED" }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

//update user by id
exports.UpdateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone_number = req.body.phone_number;
    user.image = req.body.image;
    user.adresse = req.body.adresse;
    user.role = req.body.role;
    if (req.body.password) {
      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      } else {
        return res.status(400).send({
          msg: "Le nouveau mot de passe doit être différent du mot de passe actuel.",
        });
      }
    }

    await user.save();
    return res.status(200).send("Utilisateur mis à jour avec succès.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur interne du serveur");
  }
};
//update user by id
exports.UpdateUserById = async (req, res) => {
  const id = req.payload.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }

    if (req.body.phone_number != null) {
      user.phone_number = req.body.phone_number;
    }
    if (req.file.filename != null) {
      user.image = req.file.filename;
    }
    try {
      user.save().then(updatedUser => {
        res.json(updatedUser);
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur interne du serveur");
  }
};

exports.addUserAddress = async (req, res) => {
  const id = req.payload.id;
  console.log(req.payload.id);
  console.log(req.body);
  const newAddress = {
    streetAdress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    country: req.body.country,
  };

  // Find the user by ID
  User.findById(id)
    .populate("address") // Populate the address field so we can check if it exists
    .exec((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: "Error updating user address" });
      }
      if (user.address) {
        // User already has an address, update it instead of creating a new one
        Address.findByIdAndUpdate(
          user.address._id,
          newAddress,
          { new: true },
          (err, updatedAddress) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send({ error: "Error updating user address" });
            }
            // Update the user's address field with the updated address object
            User.findByIdAndUpdate(
              id,
              { address: updatedAddress },
              { new: true },
            )
              .populate("address")
              .exec((err, updatedUser) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .send({ error: "Error updating user address" });
                }
                res.send(updatedUser);
              });
          },
        );
      } else {
        // User doesn't have an address yet, create a new one
        const address = new Address(newAddress);
        address.user_id.push(id);
        address.save((err, savedAddress) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send({ error: "Error creating user address" });
          }
          // Update the user's address field with the new address object
          User.findByIdAndUpdate(id, { address: savedAddress }, { new: true })
            .populate("address")
            .exec((err, updatedUser) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .send({ error: "Error updating user address" });
              }
              res.send(updatedUser);
            });
        });
      }
    });
};
exports.getUserAddress = async (req, res) => {
  const id = req.payload.id;
  try {
    const user = await User.findById(id).populate("address");
    const address = user?.address || null;
    console.log(address);
    res.json({ address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching user address" });
  }
};
exports.getByPayloadId = async (req, res) => {
  console.log(req.body.payload.id);
  const id = req.body.payload.id;
  try {
    const user = await User.findById(id);
    if (user == null) {
      return res.status(304).json({ message: "cannot find user" });
    }
    res.json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateUserPassword = async (req, res) => {
  try {
    const id = req.payload.id;
    const user = await User.findById(id);

    // Get new and confirm password from req.body
    const { currentPassword, newPassword, confirmPassword } = req.body;

    console.log(currentPassword, newPassword, confirmPassword);
    // Check if 2 password is equal
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send({ msg: "Les mots de passe ne sont pas identiques" });
    } else if (user) {
      console.log(user.password);
      const match = await bcrypt.compare(newPassword, user.password);

      if (!match) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        //replace password
        await User.updateOne(
          { _id: id },
          { $set: { password: hashedPassword } },
        );
        res.status(200).send({ msg: "Mot de passe changé !" });
      } else {
        return res.status(400).send({
          msg: "Le nouveau mot de passe doit être différent du mot de passe actuel.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Changement du mot de passe echoué", error });
  }
};
