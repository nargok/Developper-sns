const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_pryload, done) => {
      // console.log(jwt_pryload);
      User.findById(jwt_pryload.id)
        .then(user => {
          if(user) {
            return done(null, user);
          } else {
            return done(null, fasle);
          }
        })
        .catch(err => console.log(err));
    })
  );
};