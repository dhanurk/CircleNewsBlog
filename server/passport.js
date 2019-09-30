const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "No User Found" });
        } else if (user) {
          if (password === user.password) {
            console.log("SUCCCESSSS");
            return done(null, user);
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                console.log("SUCCCESSSS");
                return done(null, user);
              } else {
                return done(null, false, { message: "Password Incorrect" });
              }
            });
          }
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    if (user.GoogleId) {
      done(null, user.GoogleId);
    } else {
      done(null, user.id);
      // console.log(user.id);
    }

    // console.log(user);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ GoogleId: id }).then(user => {
      if (user) {
        console.log("ID ------------- " + id);
        done(null, user);
      } else {
        User.findById(id, function(err, user) {
          //     console.log("USERSS - -- " + user);

          if (err) done(err);
          if (user) {
            done(err, user);
          }
        });
      }
    });
  });
};
