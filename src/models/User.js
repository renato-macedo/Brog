const connection = require('../database');

// models são interfaces para o banco de dados
const User = {
  findByEmail(email, callback) {
    connection.query(
      `SELECT * FROM USERS where email =${connection.escape(email)}`,
      callback
    );
  },
  findByUsername(username, callback) {
    connection.query(
      `SELECT * FROM USERS where username = ${connection.escape(username)}`,
      callback
    );
  },
  store({ name, email, username, password }, callback) {
    const sql = `INSERT INTO USERS  (name, email, username, password) values (${connection.escape(
      name
    )}, ${connection.escape(email)}, ${connection.escape(
      username
    )}, ${connection.escape(password)})`;

    connection.query(sql, callback);
  }
};

module.exports = User;
