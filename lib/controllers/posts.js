const { Router } = require('express');
const Posts = require('../models/Posts');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const posts = await Posts.getAll();
    console.log('ALL POSTS', posts);
    return res.json(posts);
  } catch (err) {
    next(err);
  }
});
