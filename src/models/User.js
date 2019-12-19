const connection = require('../database');
// models são interfaces para o banco de dados
const User = {
  findUsers(callback) {
    connection.query('SELECT * FROM USERS', callback);
  }
};

module.exports = User;
