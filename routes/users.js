var express = require('express');
var router = express.Router();
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('db.db');
var db = require('../utils/conn');
var qsB = require('../utils/qsBuilder');

router.route('/')
.get(function(req, res){
  var qstring = qsB.build('users', req);;
	db.query(qstring, function(err, rows){
		if(err){
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
		} else {
			res.json(rows);
		}
	});
})
.post(function(req, res){
	db.query('INSERT INTO users(sso, name, shift, area, supervisor, onboarding, offboarding, status) VALUES(?,?,?,?,?,?,?)', [req.body.sso, req.body.name, req.body.shift, req.body.area, req.body.supervisor, req.body.onboarding, req.body.offboarding, req.body.status], function(err, row){
		if(err){
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
		} else {
			res.json({message: 'User inserted successfully!'});
		}
	});
});

router.route('/:user_id')
.get(function(req, res) {
	db.query('SELECT * FROM users where sso = ?', [req.params.user_id], function(err, row){
		if(err){
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
		} else {
			res.status(200);
			res.json(row);
		}
	}); 
})
.put(function(req, res){
	db.query('UPDATE users SET name = ?, shift = ?, area = ?, onboarding = ?, offboarding = ?, status = ? where sso = ?', [req.body.name, req.body.shift, req.body.area, req.body.onboarding, req.body.offboarding, req.body.status, req.params.user_id], function(err, row){
		if(err) {
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
		} else {
			res.json({message: 'User with sso: ' + req.body.sso + ' successfully updated!'});
		}
	});
})
.delete(function(req,res){
	db.query('DELETE FROM users where sso = ?', [req.params.user_id], function(err, row){
		if(err) {
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
		} else {
			res.json({message: 'User with sso: ' + req.params.user_id + ' sucessfully deleted!'});
		}
	});
});

module.exports = router;
