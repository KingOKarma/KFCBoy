var router = require("express").Router();
var passport = require("passport");

router.get("/", passport.authenticate("discord"));

router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/failure",
    successRedirect: "/",
  })
);

module.exports = router;
