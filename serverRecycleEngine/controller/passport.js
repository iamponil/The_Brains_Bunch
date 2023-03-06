const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: 526931533634-ja1kt209p9ncg87051ipadj8p8c2c69f.apps.googleusercontent.com,
      clientSecret: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,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(1111);

        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: "google",
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.get(
  "/google",
  passport.authenticate("google", {
    scope: [ "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  },()=>{
    console.log(111);

  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001",
    failureRedirect: "/login/failed",
  }),
  function(req, res) {
    console.log(11);

    // Handle the user data returned from the Google Authentication API
    const user = {
      name: req.user.displayName,
      email: req.user.emails[0].value,
      googleId: req.user.id,
    };

    // Save the user data to your database
    User.findOneAndUpdate({ googleId: user.googleId }, user, { upsert: true, new: true }, function(err, doc) {
      if (err) {
        console.log(err);
        return res.redirect("http://localhost:3001/login");
      }
      console.log(doc);
      return res.redirect("http://localhost:3001/login");
    });
  }
);