const express = require("express");
const app = express();


app.get("/", (req, res) => {
res.redirect("https://projectforums.xyz");
});


exports.app = app;