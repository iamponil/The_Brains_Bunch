const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../models/user");
GITHUB_CLIENT_ID = "683b37f0e00eed5b799f";
GITHUB_CLIENT_SECRET = "21c077880f847058a473bdfa6e3451141f97ee1e";

FACEBOOK_APP_ID = "483967407116903";
FACEBOOK_APP_SECRET = "7e958d709a2a38ae50bb58eeb17a3cd2";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          let newUser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            image: profile.photos[0].value,
            role: "CLIENT",
            provider: "google",
          });
          await newUser.save();
          newUser = await User.findOne({ email: profile.emails[0].value });
          return done(null, newUser);
        } else return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      scope: ['user:email'],
      callbackURL: "/auth/github/callback",
     
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({  email: profile.emails[0].value   });
        if (!user) {
          let newUser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            image: profile.photos[0].value,
            role: "CLIENT",
            provider: "github",
           
          });
          await newUser.save();
          newUser = await User.findOne({  email: profile.emails[0].value  });
          return done(null, newUser);
        } else return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
