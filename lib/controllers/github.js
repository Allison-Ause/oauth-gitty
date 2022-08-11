const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const authenticate = require('../middleware/authenticate');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

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
      console.log('USER FROM FIND', user);

      if (user === null) {
        user = await GithubUser.insert({
          username: githubProfile.login,
          email: githubProfile.email,
          avatar: githubProfile.avatar_url,
        });
        console.log('USER FROM INSERT', user);
      }
      //could sub { ...user } instead of user.toJSON() and eliminate toJSON in model
      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 Day',
      });
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/github/dashboard');
    } catch (err) {
      next(err);
    }
  })
  .get('/dashboard', authenticate, async (req, res, next) => {
    try {
      res.body(req.user);
    } catch (err) {
      next(err);
    }
  });
