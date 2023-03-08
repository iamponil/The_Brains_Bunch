require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../controller/auth-controller");
const authenticateToken = require("../middleware/Authorize");
const passportSetup = require('../controller/passport')
const CLIENT_URL = "http://localhost:3000/";

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
router.post("/sign-in", authController.login, (req, res) => {
  res.cookie("refreshToken", res.refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    user: res.user,
    accessToken: res.accessToken,
  });
}); 
//Passport_Login
router.get("/google", passport.authenticate("google",{  scope: ['profile', 'email'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
      token:req.token
    });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

module.exports = router;
