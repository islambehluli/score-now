var express = require('express');
var router = express.Router();
var axios = require("axios");
require("dotenv").config()

router.get('/competition', function(req, res, next) {
    let competition = req.query.competition;
    let title;

    switch(competition) {
        case "SA":
          title = "Serie A"
          break;
        case "PL":
          title = "Premier League"
          break;
          case "BL1":
          title = "Bundesliga"
          break;
          case "PD":
          title = "La Liga"
          break;
          case "CL":
          title = "Champions League"
          break;
        default:
          title = "League"
      }
      if(!req.session.user){
        res.redirect("/signIn")
        return;
    }

    axios.get(`https://api.football-data.org/v2/competitions/${competition}/standings`,
    {

        headers: {'X-Auth-Token': process.env.APIKEY},
    })
    .then(response=> {
      axios.get(`https://api.football-data.org/v2/competitions/${competition}/scorers`,
      {
          headers: {'X-Auth-Token': process.env.APIKEY},
      
      })
      .then(response2=>{
        axios.get(`https://api.football-data.org/v2/competitions/${competition}/matches?status=SCHEDULED`, {
          headers: {'X-Auth-Token': process.env.APIKEY},
        })
        .then(nextMatches=>{
          res.render('competitionPage.hbs', {tableTile:"Table", topScorers: "Top Scorers",title: title, tables: response.data.standings[0].table, scorers: response2.data.scorers, matches: nextMatches.data.matches});
        })
      })
    })
    .catch(function (error) {
 
        console.log(error);
    });
})

module.exports = router