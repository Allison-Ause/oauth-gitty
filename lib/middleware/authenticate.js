const GithubUser = require('../models/GithubUser');


module.exports = authenticate (req, res, next) => {
  try {
    GithubUser.findByUsername(username)
  } catch (err) {
    next(err);
  }
}