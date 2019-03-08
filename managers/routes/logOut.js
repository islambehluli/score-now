
const express = require("express");
const router = express.Router();

router.get("/logout", (req, res, next) => {
    req.session.destroy()
      // cannot access session here
      res.redirect("/signIn");
    
});

module.exports = router;

