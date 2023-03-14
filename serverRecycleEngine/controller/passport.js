const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const passport = require("passport");
const User = require("../models/user");

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
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new LinkedinStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "/auth/linkedin/callback",
      scope: ['r_emailaddress', 'r_liteprofile'],
      state: true
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
              provider: "linkedin",
             
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
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
