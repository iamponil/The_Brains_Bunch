const User = require("../models/user");
const Login=require("../models/login")
const RefreshTokens = require("../models/refreshTokens");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     user = await User.findOne({ email: email });
//     const checkPass = bcrypt.compare(password, user.password);
//     if (!user || !checkPass) {
//       return res
//         .status(400)
//         .json({ message: "No User with those information's " });
//     }
//     else{
//       const loginStats = { date: new Date() };
//       user.loginStatistics.push(loginStats);
//       await user.save();
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
  
//   let payload = {
//     id: user._id,
//     role: user.role,
//   };
//   const accessToken = generateAccessToken(payload);
//   const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
//   newRefreshToken = new RefreshTokens({
//     token: refreshToken,
//     user_id: user._id,
//   });
//   let refreshTokenDb = await newRefreshToken.save();
//   res.refreshToken = refreshTokenDb.token;
//   res.cookie("payload", payload, {
//     expiresIn: "24h",
//     httpOnly: true,
//   });
//   res.cookie("refreshToken", res.refreshToken, {
//     expiresIn: "24h",
//     httpOnly: true,
//   });
//   res.status(200).json({
//     message: "User Logged in",
//     accessToken: accessToken,
//     statusCode: res.statusCode,
//     user: user,
//     cookies: res.cookie,
//   });
// };
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "No user found with those credentials" });
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const login = new Login({
      user: user._id,
      date: new Date()
    });
    await login.save();
    let payload = {
      id: user._id,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    newRefreshToken = new RefreshTokens({
      token: refreshToken,
      user_id: user._id,
    });
    let refreshTokenDb = await newRefreshToken.save();
    res.refreshToken = refreshTokenDb.token;
    res.cookie("payload", payload, {
      expiresIn: "24h",
      httpOnly: true,
    });
    res.cookie("refreshToken", res.refreshToken, {
      expiresIn: "24h",
      httpOnly: true,
    });
    res.status(200).json({
      message: "User Logged in",
      accessToken: accessToken,
      statusCode: res.statusCode,
      user: user,
      cookies: res.cookie,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

  
exports.getLoginStats = async (req, res) => {
  try {

    const date = new Date();
    const logins = await Login.find({
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
      }
    }).populate('user');
  
    const data = {};
    logins.forEach(login => {
      const name = login.user.name;
      if (data[name]) {
        data[name] += 1;
      } else {
        data[name] = 1;
      }
    });
  
    const labels = Object.keys(data);
    const values = Object.values(data);
  
    res.send({ labels, values });
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}

exports.logout = async (req, res, next) => {
  const id = req.body.payload.id;
  const refreshToken = await RefreshTokens.deleteMany({ user_id: id });
  if (refreshToken.deletedCount > 0) {
    res.cookie("refreshToken", "", {
      expiresIn: Date.now(),
      httpOnly: true,
    });
    res.cookie("payload", "", {
      expiresIn: Date.now(),
      httpOnly: true,
    });
    req.session = null;
    res.status(201).json({ message: "logout", statusCode: res.statusCode });
  } else {
    res.status(403).json({ message: "logout failed" });
  }
};

exports.getUserFromToken = async (req, res, next) => {
  const id = req.body.payload.id;
  const user = await User.findById(id).populate("product");
  let newPayload = {
    id: user.id,
    role: user.role,
  };
  const accessToken = generateAccessToken(newPayload);
  res.user = user;
  res.accessToken = accessToken;
  next();
};

// get access token from refresh token
exports.getAccesTokenFromRefreshToken = async (req, res, next) => {
  let verify = false;
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);
  const refreshTokens = await RefreshTokens.find();
  for (let token of refreshTokens) {
    if (token.token == refreshToken) {
      verify = true;
      break;
    }
  }
  if (!verify) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    let newPayload = {
      id: payload.id,
      role: payload.role,
    };
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(newPayload);
    res.json({ accessToken: accessToken });
  });
};

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
}
