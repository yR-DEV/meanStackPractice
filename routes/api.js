var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/posts', function(req, res, next) {
  // posts.find({}).then(function(data) {
  //   render.json(data);
  // });
});

module.exports = router;
