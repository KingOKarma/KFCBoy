const app = require("../app");
var router = require("express").Router();
var subdomains = require("express-subdomain")


router.get("/", (req,res) => {
  res.redirect("http://projectforums.xyz")
})

router.use(subdomains("invite", router));

module.exports = router
