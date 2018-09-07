var express = require('express');
var router = express.Router();
var connection = require("../db");

var months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

function getNumberMonth(string) {
	for( var i = 0; i < months.length; i ++) {
		if(months[i] === string ) {
			console.log(i + 1);
			return i + 1;

		}
	}
}
/* GET home page. */
router.get('/', function(req, res){
  connection.query('SELECT * FROM BerryIssues ORDER BY issueYear DESC, issueMonth DESC', function(err, rows){
    res.render('berry', {issues : rows, title: 'The Juniper Berry Magazine'});
  });
});
router.get('/:year/:month', function(req, res){
	connection.query('SELECT * FROM BerryIssues WHERE issueYear=' +  req.params.year + ' AND issueMonth=' + getNumberMonth(req.params.month), function(err, issueRow){
		connection.query('SELECT * FROM BerryArticles WHERE issuenum=' + issueRow[0].id, function(err, rows){
			res.render('berry_issue', {articles : rows, issue: issueRow, title: "The Juniper Berry Magazine " + req.params.month + " " + req.params.year});
		});
	});
});
router.get('/:year/:month/:slug', function(req, res){
	connection.query('SELECT * FROM BerryIssues WHERE issueYear=' +  req.params.year + ' AND issueMonth=' + getNumberMonth(req.params.month), function(err, issueRow){
		connection.query('SELECT * FROM BerryArticles WHERE issuenum=' + issueRow[0].id, function(err, allArticlesRows){
			connection.query('SELECT * FROM BerryArticles WHERE issuenum=' + issueRow[0].id + ' AND slug="' + req.params.slug + '"', function(err, rows){
				res.render('berry_article', {article : rows, articles : allArticlesRows, issue: issueRow, title: rows[0].headline + " - The Juniper Berry Magazine " + req.params.month + " " + req.params.year});
			});
		});
	});
});

module.exports = router;
