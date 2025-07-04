const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


const GOOGLE_CLIENT_ID = '945260301573-s3nvp38bs2hegkg6fk27jnmqnbtg6740.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},

function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
