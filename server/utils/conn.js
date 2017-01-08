var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2tanar13',
  database: 'hurema'
});
module.exports = connection;
