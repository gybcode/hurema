/*var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('db.db');

db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS admins(sso TEXT PRIMARY KEY, password TEXT, name TEXT, shift TEXT, area TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS users(sso TEXT PRIMARY KEY, name TEXT, shift TEXT, area TEXT, onboarding TEXT, offboarding TEXT, status TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS notices(id INTEGER PRIMARY KEY, sso TEXT, issuedate TEXT, issuedby TEXT, comment TEXT, type TEXT)");
});*/
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hourlypd'
});
connection.connect(function(err){
  if(err){
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
  connection.query('select * from admins', function(err, result, fields){
    if(err){
      console.error('error in query: ' + err.stack);
      return;
    }
    console.log(result);
    connection.end();
  });
});
