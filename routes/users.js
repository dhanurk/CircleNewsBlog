const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const Blog = require("../models/blogModel.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// router.get("/test", (req, res) => res.json({ msg: "User Works" }));

router.get("/current", (req, res) => {
  res.json(req.user);
});

// REGISTER A USER

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// LOGIN USER

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    if (req.user) {
      //   console.log(req.user);

      res.json({
        success: true,
        user: req.user
      });
    }
  }
);

// router.post('/local',(req,res))
module.exports = router;
