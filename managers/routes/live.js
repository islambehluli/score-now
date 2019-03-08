var express = require('express');
var router = express.Router();
var axios = require("axios");

router.get('/live', function(req, res, next) {
    if(!req.session.user){
        res.redirect("/signIn")
        return;
    }
    axios.get("https://api.football-data.org/v2/competitions/SA/matches?status=IN_PLAY",
    {
        headers: {'X-Auth-Token': '464f8f7e07d442c58eebab7ff1f8611d'},
    })
    .then(response=> {
        axios.get("https://api.football-data.org/v2/competitions/PL/matches?status=IN_PLAY",
        {
            headers: {'X-Auth-Token': '464f8f7e07d442c58eebab7ff1f8611d'},
        
        })
    
        .then(result2=> {
            axios.get("https://api.football-data.org/v2/competitions/BL1/matches?status=IN_PLAY",
            {
                headers: {'X-Auth-Token': '464f8f7e07d442c58eebab7ff1f8611d'},
            
            })
        
            .then(result3=>{
                axios.get("https://api.football-data.org/v2/competitions/PD/matches?status=IN_PLAY",
                {
                    headers: {'X-Auth-Token': '464f8f7e07d442c58eebab7ff1f8611d'},
                
                })
            
                .then(result4=> {
                    
                    res.render('live.hbs', {title: "Live matches!", italy: response.data.matches, premier: result2.data.matches, bundesliga: result3.data.matches, laliga: result4.data.matches });
                
                })
            })
        })
    })

    .catch(function (error) {

        console.log(error);
        })
    })

module.exports = router;