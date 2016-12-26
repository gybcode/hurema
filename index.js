var express 	= require('express');
var app 	= express();
var bodyParser	= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
var adminRouter = require('./routes/admins');
var userRouter = require('./routes/users');

router.get('/', function(req, res) {
  res.json({message: 'hooray! welcome to our api!' });
});

app.use('/api', router);
app.use('/api/admins', adminRouter);
app.use('/api/users', userRouter);

app.listen(port);
console.log('Magic on port ' + port);
