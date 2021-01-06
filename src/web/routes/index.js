var router = require("express").Router();
const bot = require("../../index");
const { authorised } = require("./middleware/middleware");
router.get("/", (req, res) => {
  console.log(bot);
  res.render("home", { user: req.user, client: bot });
});

router.get("/invite", (req, res) => {
  res.redirect(
    "https://discord.com/oauth2/authorize?client_id=614110037291565056&permissions=2147483639&scope=bot    "
  );
});

router.get("/game", authorised, (req, res) => {
  console.log("game loading");
  res.render("game", { User: req.user });
});
module.exports = router;
