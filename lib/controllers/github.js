const { Router } = require('express');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github');
const GithubUser = require('../models/GithubUser');

module.exports = Router()
  .get('/login', async (req, res, next) => {
    try {
      res.redirect(
        `https:github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
      );
    } catch (err) {
      next(err);
    }
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);
      console.log('token is:', token);

      const githubProfile = await getGithubProfile(token);
      console.log('GITHUB PROFILE INFO', githubProfile);

      let user = await GithubUser.findByUsername(githubProfile.login);

      if (!user) {
        user = await GithubUser.insert({
          username: githubProfile.login,
          email: githubProfile.email,
          avatar: githubProfile.avatar_url,
        });
      }
    } catch (err) {
      next(err);
    }
  });
