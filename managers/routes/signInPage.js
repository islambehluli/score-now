const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/user");
const bcrypt = require("bcrypt");


router.get("/signIn", (req, res, next) => {
    res.render("signIn.hbs");
});
router.post("/signIn", (req, res, next) => {
    const theemail = req.body.email;
    const thePassword = req.body.password;
  
    if (theemail === "" || thePassword === "") {
      res.render("signIn.hbs", {
        errorMessage: "Please enter both, email and password to sign up."
      });
      return;
    }
  
    User.findOne({ "email": theemail })
    .then(user => {
        if (!user) {
          res.render("signIn.hbs", {
            errorMessage: "The email doesn't exist."
          });
          return;
        }
        if (bcrypt.compareSync(thePassword, user.password)) {
          // Save the login in the session!
          req.session.user = user;
          res.redirect("/");
        } else {
          res.render("signIn.hbs", {
            errorMessage: "Incorrect password"
          });
        }
    })
    .catch(error => {
      next(error);
    })
  });

  module.exports = router;