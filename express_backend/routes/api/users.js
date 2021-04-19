const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/default.json");
const User = require("../../model/user");
const validateRegisteration = require("../../validation/register");
const validateLogin = require("../../validation/login");
const passport = require("../../config/passport");
const { OAuth2Client } = require("google-auth-library");
const { response } = require("express");

const Client = new OAuth2Client(keys.googleClientid);

router.post("/register", (req, res) => {
  const mail = req.body.email.toLowerCase();
  const { errors, isValid } = validateRegisteration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: mail }).then((user) => {
    if (user) {
      return res.status(404).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: mail,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    if(user.password === ""){
      const payload = {
        id: user.id,
        name: user.name,
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926,
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } 
    else if(user.password !== ""){
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
          };
  
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926,
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        }
        else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    }
    
  });
});

router.post("/googleLogin", (req, res) => {
  const token = req.body.id;
  // console.log(token)
  Client.verifyIdToken({
    idToken: token,
    audience: keys.googleClientid,
  }).then((response) => {
    const { email_verified, name, email } = response.payload;
    console.log(response.payload);
    if (email_verified === true) {
      User.findOne({ email }).then((user) => {
        if (user) {
          const loginDetails = {
            id : user.id,
            name : user.name 
          }
          console.log("login details" ,loginDetails)
          jwt.sign(
            loginDetails,
            keys.secretOrKey,
            {
              expiresIn: 31556926,
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          const newAccount = new User({
            name: name,
            email: email,
            password:'',
          });
          // bcrypt.genSalt(10, (err, salt) => {
          //   bcrypt.hash(newAccount.password, salt, (error, hash) => {
          //     if (error) throw error;
          //     newAccount.password = hash;
              newAccount
                .save()
                .then((u) => {
                  const details = {
                    id : u.id,
                    name : u.name 
                  }
                  console.log("login details" ,details)
                  jwt.sign(
                    details,
                    keys.secretOrKey,
                    {
                      expiresIn: 31556926,
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token,
                      });
                    }
                  );})
                .catch((e) => {res.json(e)});
            // });
          // });
        }
      });
    }
  });
});
module.exports = router;
