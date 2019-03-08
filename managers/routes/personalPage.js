const express = require("express")
const router = express.Router();
const User = require("../Models/user")

router.get("/personalPage", (req, res)=>{

    User.find({favouriteTeam: req.session.user.favouriteTeam})
    
       .populate('messages').exec()
    .then(result => {
        res.render("personalPage", {userName: req.session.user.name, userEmail: req.session.user.email, team: req.session.user.favouriteTeam, friends: result})
    })
    .catch(err => {throw err})
})



    module.exports = router;





