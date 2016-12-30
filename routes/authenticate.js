var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

db.serialize(function(){
});

router.route('/')
.post(function(req, res){
	db.get('SELECT * from admins where sso = ?', req.body.sso, function(err, user){
		if(err){
			console.log(err);
			res.status(500);
		} else {
			if(!user){
				res.json({success: false, message:'Authentication failed. User not found'});
			} else if (user){
				if(user.password != md5(req.body.password)){
					res.json({success:false, message: 'Authentication failed. Wrong password'});
				} else {
					var token = jwt.sign(user, req.app.get('secret'), {
						expiresIn: 60*60*24
					});
					res.json({success: true, message: 'Authentication successfull!', token: token, user: user});
				}
			}
		}
	});	
});

module.exports = router;
