const User = require("../models/User");
const isAdmin = require("./isAdmin");

const isOwner = (req, res, next) => {
  if (req.params.id === req.user.id) {
    next();
  } else {
    isAdmin(req, res, next);
  }
}

module.exports = isOwner;