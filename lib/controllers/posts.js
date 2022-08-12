const { Router } = require('express');
const Posts = require('../models/Posts');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Posts.getAll();
      return res.json(posts);
    } catch (err) {
      next(err);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        user_id: req.user.id,
      };

      const newPost = await Posts.insert(data);
      return res.json(newPost);
    } catch (err) {
      next(err);
    }
  });
