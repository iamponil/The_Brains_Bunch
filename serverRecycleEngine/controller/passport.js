const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const User = require("../models/user");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done)  {
      try {
        
        let user = await User.findOne({  email: profile.emails[0].value   });
               if(!user){
              newUser=   new User({
                   email: profile.emails[0].value,
                   name: profile.displayName,
                   image:profile.photos[0].value,
                   role:"CLIENT",
                   provider: "google",
                  })
                  await newUser.save();
                  return done(null, newUser);
                }
                else 
                  return done(null, user);
                
              } catch (error) {
                return done(error);
               }
    }
  )
);

passport.serializeUser((user,done)=>{
  done(null,user);
})
passport.deserializeUser((user,done)=>{
   done(null,user);
 })

   

