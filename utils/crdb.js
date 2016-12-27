var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db.db');

db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS admins(sso TEXT PRIMARY KEY, password TEXT, name TEXT, shift TEXT, area TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS users(sso TEXT PRIMARY KEY, name TEXT, shift TEXT, area TEXT, onboarding TEXT, offboarding TEXT, status TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS notices(id INTEGER PRIMARY KEY, sso TEXT, issuedate TEXT, issuedby TEXT, comment TEXT, type TEXT)");
});
