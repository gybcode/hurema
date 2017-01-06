var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
  user: 'root',
  password: '',
  database: 'hourlypd'
});
module.exports = connection;
