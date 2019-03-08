var express = require('express');
var router = express.Router();



router.get('/videos', function(req, res, next) {
    if(!req.session.user){
        res.redirect("/signIn")
        return;
    }
    res.render("videos.hbs");
})

module.exports = router;