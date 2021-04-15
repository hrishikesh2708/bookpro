const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/default.json");
const User = require("../../model/user");
const validateRegisteration = require("../../validation/register");
const validateLogin = require("../../validation/login");
const passport = require('../../config/passport')

router.post("/register", (req, res) => {
  const mail = (req.body.email).toLowerCase()
  const { errors, isValid } = validateRegisteration(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: mail }).then(user => {
      if (user) {
        return res.status(404).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: mail,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

router.post("/login", (req, res) => {

const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = (req.body.email).toLowerCase();
  const password = req.body.password;

  User.findOne({ email }).then(user => {

    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

        const payload = {
          id: user.id,
          name: user.name
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;