var express 	= require('express');
var app 	= express();
var bodyParser	= require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
app.set('secret', config.secret);
app.use(morgan('dev'));

var authenticate = require('./routes/authenticate');
var adminRouter = require('./routes/admins');
var userRouter = require('./routes/users');
var noticeRouter = require('./routes/notices');

app.use('/api/authenticate', authenticate);
app.use(function(req,res,next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token){
		jwt.verify(token, app.get('secret'), function(err, decoded){
			if(err){
				return res.json({success:false, message: 'Failed to authenticate token!'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided'
		});
	}
});

app.use('/api/admins', adminRouter);
app.use('/api/users', userRouter);
app.use('/api/notices', noticeRouter);

app.listen(port);
console.log('Magic on port ' + port);
