require("./strat/discord")

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require("../config.json")
var session = require("express-session")

const { readdirSync } = require('fs');
const passport = require('passport');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if(config.Version == "dev") {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// passport
app.use(session({
  secret:config.SessionSecret,
  cookie: {
    maxAge: 600000 * 60 * 24
  },
  saveUninitialized: false,
  name: "kfcBoyLogin"
}))

app.use(passport.initialize())
app.use(passport.session())

readdirSync(path.join(__dirname, "routes")).forEach(route => {
  if(!route.includes(".js")) return
  console.log("loading route: " + route)
  if(route == "index.js") {
    app.use(`/`, require(`./routes/${route}`))
  } else {
    app.use(`/${route.replace(".js", "")}`, require(`./routes/${route}`))
  }
})


// catch 404 and forward to error handler


// error handler


module.exports = app;
