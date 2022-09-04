const db = require(`./index.js`);

db.queryAsync(`INSERT INTO fambamschema.profile (f_name, l_name, username) VALUES($1, $2, $3)`, ['Robert', 'Campbell', 'Dad'])
  .then(() => db.queryAsync(`INSERT INTO fambamschema.credentiales (user_id, username, pass) VALUES($1, $2, $3)`, [1, 'Dad', 'B3y0urs3lf!']))