const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/user")

const bcrypt = require("bcrypt");
const bcryptSalt = 5;

router.get("/registration", (req, res)=>{
    res.render("registration.hbs")
})
router.post("/registration", (req,res)=>{

    const {name,email, password,favouriteTeam} = req.body;

    if(email == "" || password == ""){
        res.render("registration", {errorMessage: "fill in your email or password to sign up"} )
    }

    User.findOne({"email" : email})
    .then(user =>{
        if(user !== null) {
            res.render("registration", {errorMessage: "the email address is already existing"
        }); 
        return;
        } 

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password,salt)
    
        const newUser = new User ({
            name,
            email,
            password: hashPass,
            favouriteTeam
        })
        newUser.save()
        .then(()=>{
            res.redirect("/signIn")
        })
        .catch((err)=>{
            console.log(err)
        });
    })
    .catch((err) => {
        console.log(err)
    });
})



module.exports = router