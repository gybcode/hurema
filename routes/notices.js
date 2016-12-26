var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');
var qsB = require('../utils/qsBuilder');
db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS notices(id INTEGER PRIMARY KEY, sso TEXT, issuedate TEXT, issuedby TEXT, comment TEXT, type TEXT)");
});

router.route('/')
.get(function(req, res){
	var qstring = qsB.build('notices', req);
	db.all(qstring, function(err, rows){
		if(err){
			console.log(err);
			res.status(500);
		} else {
			res.json(rows);
		}
	});
})
.post(function(req, res){
	db.run('INSERT INTO admins(sso, issuedate, issuedby, comment, type) VALUES(?,?,?,?,?)', req.body.sso, req.body.issuedate, req.body.issuedby, req.body.comment, req.body.type, function(err, row){
		if(err){
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'Notice inserted successfully!'});
		}
	});
});

router.route('/:user_id')
.get(function(req, res) {
	db.get('SELECT * FROM admins where sso = ?', req.params.user_id, function(err, row){
		if(err){
			console.log(err);
			res.status(500);
		} else {
			res.status(200);
			res.json(row);
		}
	}); 
});

router.route('/:notice_id')
.delete(function(req,res){
	db.run('DELETE FROM admins where sso = ?', req.params.notice_id, function(err, row){
		if(err) {
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'Admin with sso: ' + req.params.notice_id + ' sucessfully deleted!'});
		}
	});
});

module.exports = router;
