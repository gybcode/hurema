var express = require('express');
var router = express.Router();
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('db.db');
var db = require('../utils/conn');
var qsB = require('../utils/qsBuilder');

router.route('/')
.get(function(req, res){
	var qstring = qsB.build('notices', req);
	db.query(qstring, function(err, rows){
		if(err){
			res.status(500).send({message: '' + err, code: err.code, errno: err.errno});
		} else {
			res.json(rows);
		}
	});
})
.post(function(req, res){
	db.query('INSERT INTO notices(sso, issuedate, issuedby, comment, type) VALUES(?,?,?,?,?)', [req.body.sso, req.body.issuedate, req.body.issuedby, req.body.comment, req.body.type], function(err, row){
		if(err){
			res.status(500).send({message: '' + err, code: err.code, errno: err.errno});
		} else {
			res.json({message: 'Notice inserted successfully!'});
		}
	});
});

router.route('/:user_id')
.get(function(req, res) {
	db.query('SELECT * FROM notices where sso = ?', [req.params.user_id], function(err, row){
		if(err){
			res.status(500).send({message: '' + err, code: err.code, errno: err.errno});
		} else {
			res.status(200);
			res.json(row);
		}
	}); 
});

router.route('/:notice_id')
.delete(function(req,res){
	db.query('DELETE FROM notices where sso = ?', [req.params.notice_id], function(err, row){
		if(err) {
			res.status(500).send({message: '' + err, code: err.code, errno: err.errno});
		} else {
			res.json({message: 'Admin with sso: ' + req.params.notice_id + ' sucessfully deleted!'});
		}
	});
});

module.exports = router;
