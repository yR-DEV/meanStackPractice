var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/posts-workshop')
var Post = db.get('posts')

router.get('/posts', function (req, res, next) {
  Post.find({}).then(function (posts) {
    res.json(posts);
  })
})

module.exports = router;
