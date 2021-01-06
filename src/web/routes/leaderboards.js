var express = require("express");
var router = express.Router();
var fs = require("fs");
var GXp = require("../../models/globalXp");
const Guilds = require("../../models/guilds");
var Xp = require("../../models/xp");
const { authorised } = require("./middleware/middleware");

/* GET home page. */
router.get("/", authorised, function (req, res, next) {
  GXp.find({}, (err, XP) => {
    if (err) return console.log(err);
    if (!XP) {
      return res.sendStatus(404);
    } else {
      return res.render("leaderboard", { users: XP, Surfer: req.user });
    }
  });
});

router.get("/search", authorised, (req, res) => {
  console.log(req);
  console.log(req.query);
  var search = req.query.search;
  if (search == undefined) return res.redirect("#");
  Guilds.find({}, async (err, guilds) => {
    var results = [];
    guilds.forEach((guild) => {
      if (
        guild.Name.toLowerCase().search(search.toLocaleLowerCase()) != -1 ||
        guild.ID.search(search) != -1
      ) {
        results.push(guild);
      } else {
        return;
      }
    });
    console.log(results);
    res.render("results", { results: results });
  });
});

router.get("/guild/:GuildID", authorised, (req, res, next) => {
  var GuildID = req.params.GuildID;
  if (GuildID) {
    Xp.find({ ServerID: GuildID }, (err, users) => {
      if (err) return res.sendStatus(404);
      res.render("guild", { users: users, GuildID: GuildID, Surfer: req.user });
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
