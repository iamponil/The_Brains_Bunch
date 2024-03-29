require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = authenticateToken;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.body["payload"] = user;
    req.payload = user;
    req.user = user;
 // Store user login statistics
//  const loginStats = { date: new Date() };
//  req.user.loginStatistics.push(loginStats);
//  req.user.save();
    next();
  });
}
