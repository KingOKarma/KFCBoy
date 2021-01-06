function authorised(req, res, next) {
  if (req.user) {
    console.log("user is logged in");
    next();
  } else {
    console.log("user werent found :sad~1:");
    res.redirect("/login");
  }
}

module.exports = {
  authorised,
};
