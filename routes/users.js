var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');
var qsB = require('../utils/qsBuilder');

db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS users(sso TEXT, name TEXT, shift TEXT, area TEXT, onboarding TEXT, offboarding TEXT, status TEXT)");
});

router.route('/')
.get(function(req, res){
  var qstring = qsB.build('users', req);;
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
	var data = req.body;
	db.run('INSERT INTO users(sso, name, shift, area, onboarding, offboarding, status) VALUES(?,?,?,?,?,?,?)', req.body.sso, req.body.name, req.body.shift, req.body.area, req.body.onboarding, req.body.offboarding, req.body.status, function(err, row){
		if(err){
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'User inserted successfully!'});
		}
	});
});

router.route('/:user_id')
.get(function(req, res) {
	db.get('SELECT * FROM users where sso = ?', req.params.user_id, function(err, row){
		if(err){
			console.log(err);
			res.status(500);
		} else {
			res.status(200);
			res.json(row);
		}
	}); 
})
.put(function(req, res){
	db.run('UPDATE users SET name = ?, shift = ?, area = ?, onboarding = ?, offboarding = ?, status = ? where sso = ?', req.body.name, req.body.shift, req.body.area, req.body.onboarding, req.body.offboarding, req.body.status, req.params.user_id, function(err, row){
		if(err) {
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'User with sso: ' + req.body.sso + ' successfully updated!'});
		}
	});
})
.delete(function(req,res){
	db.run('DELETE FROM users where sso = ?', req.params.user_id, function(err, row){
		if(err) {
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'User with sso: ' + req.params.user_id + ' sucessfully deleted!'});
		}
	});
});

module.exports = router;
