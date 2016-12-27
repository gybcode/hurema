var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');
var qsB = require('../utils/qsBuilder');
var md5 = require('md5');

router.route('/')
.get(function(req, res, next){
	var qstring = qsB.build('admins', req);
	db.all(qstring, function(err, rows){
		if(err){
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
			next();
		} else {
			res.json(rows);
		}
	});
})
.post(function(req, res, next){
	db.run('INSERT INTO admins(sso, password, name, shift, area) VALUES(?,?,?,?,?)', req.body.sso, md5(req.body.password), req.body.name, req.body.shift, req.body.area, function(err, row){
		if(err){
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
			next();
		} else {
			res.json({message: 'Admin inserted successfully!'});
		}
	});
});

router.route('/:admin_id')
.get(function(req, res, next) {
	db.get('SELECT * FROM admins where sso = ?', req.params.admin_id, function(err, row){
		if(err){
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
			next();
		} else {
			res.status(200);
			res.json(row);
		}
	}); 
})
.put(function(req, res, next){
	db.run('UPDATE admins SET password = ?, name = ?, shift = ?, area = ? where sso = ?', md5(req.body.password), req.body.name, req.body.shift, req.body.area, req.body.sso, function(err, row){
		if(err) {
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
			next();
		} else {
			res.json({message: 'Admin with sso: ' + req.body.sso + ' successfully updated!'});
		}
	});
})
.delete(function(req,res,next){
	db.run('DELETE FROM admins where sso = ?', req.params.admin_id, function(err, row){
		if(err) {
			res.status(500).send({message:'' + err, code: err.code, errno: err.errno});
			next();
		} else {
			res.json({message: 'Admin with sso: ' + req.params.admin_id + ' sucessfully deleted!'});
		}
	});
});

module.exports = router;
