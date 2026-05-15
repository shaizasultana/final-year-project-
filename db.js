const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', 
  database: 'connect',        
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error(' Connection failed:', err.message);
    return;
  }
  console.log(' Connected to existing database: connect');
})

module.exports = db;
