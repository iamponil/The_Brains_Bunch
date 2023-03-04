require("dotenv").config();
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const authController = require("../controller/auth-controller");
const authenticateToken = require("../middleware/Authorize");

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

module.exports = router;
