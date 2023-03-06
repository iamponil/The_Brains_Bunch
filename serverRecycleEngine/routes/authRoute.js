require("dotenv").config();
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const authController = require("../controller/auth-controller");
const authenticateToken = require("../middleware/Authorize");
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
router.get("/google", passport.authenticate("google", { scope: ["profile"] }),(req,res)=>{  
res.status(200).json({
  user: res.user,
  accessToken: res.accessToken,

  }
  );
  console.log(req.body);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),(req,res)=>{
    console.log(req.body+" this is the req body");
  }
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
