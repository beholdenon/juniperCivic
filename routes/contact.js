var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact');
});
router.post('/submit', function(req, res, next) {
	var name = req.body.name;
	console.log(name);
});

module.exports = router;
