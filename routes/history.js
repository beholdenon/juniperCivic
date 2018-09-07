var express = require('express');
var router = express.Router();
var connection = require("../db");

/* GET home page. */
router.get('/', function(req, res){
  connection.query('SELECT * FROM History ORDER BY id DESC', function(err, rows){
    res.render('history', {articles : rows});
  });
});
router.get('/:slug', function(req, res){
	connection.query('SELECT * FROM History WHERE slug="' + req.params.slug + '"', function(err, rows){
		res.render('history_article', {article : rows});
	});
});

module.exports = router;
