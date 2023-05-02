require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const RefreshTokens = require("../models/refreshTokens");
const jwt = require("jsonwebtoken");
const authController = require("../controller/auth-controller");
const authenticateToken = require("../middleware/authorize");
const storage = require("../middleware/storage");
//const passportSetup = require("../controller/passport");
const CLIENT_URL = "http://localhost:3000/";
const loginUrl = "http://localhost:3000/login";
//! get access token from refresh token
router.get("/token", authController.getAccesTokenFromRefreshToken);
// ! get a user from token
router.get(
  "/refresh-access-token",
  authenticateToken,
  authController.getUserFromToken,
  (req, res) => {
    res.status(200).json({
      user: res.user,
      accessToken: res.accessToken,
    });
  }
);
router.get(
  "/user",
  authenticateToken,
  authController.getUserFromToken,
  (req, res) => {
    res.status(200).json(res.user);
  }
);

//! logout the user
router.delete("/logout", authenticateToken, authController.logout);

//! login routes calls login method on controller
router.post("/sign-in", authController.login);
//Passport_Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL + "loading",
    failureRedirect: "/login/failed",
  })
);

router.get("/login/success", async (req, res) => {
  let payload = {
    id: req.user._id,
    role: req.user.role,
  };
  const accessToken = generateAccessToken(payload);
  req.token = accessToken;
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  newRefreshToken = new RefreshTokens({
    token: refreshToken,
    user_id: req.user._id,
  });
  let refreshTokenDb = await newRefreshToken.save();
  res.refreshToken = refreshTokenDb.token;
  res.cookie("refreshToken", res.refreshToken, {
    expiresIn: "24h",
    httpOnly: true,
  });
  res.cookie("payload", payload, {
    expiresIn: "24h",
    httpOnly: true,
  });
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
      token: req.token,
    });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    prompt: "select_account",
  })
);

router.get(
  "/github/callback",
  passport.authenticate(
    "github",
    // {
    //   scope: ["user:email"],
    //   prompt: "select_account",
    // },
    {
      successRedirect: CLIENT_URL + "loading",
      failureRedirect: "/login/failed",
    }
  )
);

router.get(
  "/linkedin",

  passport.authenticate("linkedin")
);

router.get(
  "/linkedin/callback",

  passport.authenticate("linkedin", {
    successRedirect: CLIENT_URL + "loading",
    failureRedirect: "/login/failed",
  })
);
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
}
router.get("/user/login-stats", authController.getLoginStats);
module.exports = router;
