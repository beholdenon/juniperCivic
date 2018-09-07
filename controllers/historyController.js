var connection = require("../db");

exports.index = function(req, res) {
	connection.query('SELECT * FROM History ORDER BY id DESC', function(err, rows){
		res.render('history', {articles : rows});
	});
}
exports.article = function(req, res) {
	connection.query('SELECT * FROM History WHERE slug="' + req.params.slug + '"', function(err, rows){
		res.render('history_article', {article : rows});
	});
}