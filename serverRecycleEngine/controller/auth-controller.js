const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RefreshTokens = require("../models/refreshTokens");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No User with those information's " });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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
  res.status(200).json({
    message: "User Logged in",
    accessToken: accessToken,
    statusCode: res.statusCode,
    user: res.user,
  });
  next();
};

exports.logout = async (req, res, next) => {
  const id = req.body.payload.id;
  const refreshToken = await RefreshTokens.deleteMany({ user_id: id });
  if (refreshToken.deletedCount > 0) {
    res.cookie("refreshToken", "", {
      expiresIn: Date.now(),
      httpOnly: true,
    });
    res.status(201).json({ message: "logout" });
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
