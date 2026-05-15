const db = require('../db');

db.query('SELECT * FROM users', (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }
});
