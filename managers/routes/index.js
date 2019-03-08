var express = require('express');
var router = express.Router();
var axios = require("axios");
require("dotenv").config()
/* GET home page. */
router.get('/', function(req, res, next) {
  // if(req.session.user){
  //   var layouts = "layoutLoggedIn.hbs"

  axios.get(`https://newsapi.org/v2/top-headlines?sources=football-italia&apiKey=${process.env.APINEWS}`, {
    headers: {'X-Auth-Token': process.env.APIKEY},
  })
  .then(function (response) {
      res.render('index.hbs', { title: "Italy'S news!", article: response.data.articles});
    //   , article: response.data.articles
  })
  .catch(function (error) {
    console.log(error);
  });

});



module.exports = router;