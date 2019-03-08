const express = require("express")
const router = express.Router();
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const User = require("../Models/user")
const Posts = require("../Models/post")

router.get("/allMessages", (req,res)=>{
    Posts.find().populate("name").exec().then( allMessages=>{
        
        res.render("messages.hbs", {messages: allMessages})

    })
})

router.post("/createMessage", (req,res)=>{
    var message = req.body.post;
    var userId =  req.session.user._id
    if(!message){
        return
    }

    
    new Posts({
        name: userId,
        post: message
    })
    .save().then(savedPost =>{
        debugger
        User.findByIdAndUpdate(userId, {$push : {messages: savedPost.id}})
        res.redirect("/allMessages")
    })
    .catch(err => {
        throw err;
    })

})

    module.exports = router;

