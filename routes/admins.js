var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');
var qsB = require('../utils/qsBuilder');
db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS admins(sso TEXT, name TEXT, shift TEXT, area TEXT)");
});

router.route('/')
.get(function(req, res){
	var qstring = qsB.build('admins', req);
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
	db.run('INSERT INTO admins(sso, name, shift, area) VALUES(?,?,?,?)', req.body.sso, req.body.name, req.body.shift, req.body.area, function(err, row){
		if(err){
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'Admin inserted successfully!'});
		}
	});
});

router.route('/:admin_id')
.get(function(req, res) {
	db.get('SELECT * FROM admins where sso = ?', req.params.admin_id, function(err, row){
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
	db.run('UPDATE admins SET name = ?, shift = ?, area = ? where sso = ?', req.body.name, req.body.shift, req.body.area, req.body.sso, function(err, row){
		if(err) {
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'Admin with sso: ' + req.body.sso + ' successfully updated!'});
		}
	});
})
.delete(function(req,res){
	db.run('DELETE FROM admins where sso = ?', req.params.admin_id, function(err, row){
		if(err) {
			console.log(err);
			res.status(500);
		} else {
			res.json({message: 'Admin with sso: ' + req.params.admin_id + ' sucessfully deleted!'});
		}
	});
});

module.exports = router;
