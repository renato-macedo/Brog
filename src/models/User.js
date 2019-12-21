const connection = require('../database');
// models são interfaces para o banco de dados
const User = {
  findByEmail(email, callback) {
    connection.query(`SELECT * FROM USERS where email ='${email}'`, callback);
  },
  insert({ name, email, password }) {
    connection.query(
      `INSERT INTO USERS  (name, email, password) values (${name}, ${email}, ${password})`
    );
  }
};

module.exports = User;
