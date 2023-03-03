const User = require("../models/user");
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
  const userDb = new User(user);
  try {
    const user = await userDb.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
