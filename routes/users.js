var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({code: 200, data: { title: 'users' }});
});

module.exports = router;
