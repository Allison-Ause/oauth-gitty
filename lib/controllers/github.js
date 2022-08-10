const { Router } = require('express');
// const GithubUser = require('../models/Github');

module.exports = Router().get('/login', async (req, res, next) => {
  try {
    res.redirect(
      `https:github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  } catch (err) {
    next(err);
  }
});
