const connect = require('../database');
let connection;
function setConnection() {
  connect().then(c => (connection = c));
}
setConnection();

const User = {
  async findByEmail(email) {
    const results = await connection.query(
      `SELECT * FROM USERS where email = ?`,
      [email]
    );

    if (results && results.length > 0) {
      return results[0][0];
    }

    return null;
  },
  async checkIfExists(email, username) {
    const results = await connection.query(
      `SELECT * FROM USERS where email = ? or username = ?`,
      [email, username]
    );
    console.log(JSON.stringify(results[0], null, 2));
    if (results) {
      user = results[0][0];
      if (user.email == email) {
        return [true, 'A user with this email already exists'];
      }

      if (user.username == username) {
        return [true, 'this is username is already taken'];
      }
    }

    return [false, null];
  },
  async findByUsername(username) {
    const results = await connection.query(
      `SELECT * FROM USERS where username = ?`,
      [username]
    );
    if (results && results.length > 0) {
      return results[0][0];
    }

    return null;
  },
  async store({ name, email, username, password }) {
    const result = await connection.query(
      `INSERT INTO USERS  (name, email, username, password) values (?, ?, ?, ?)`,
      [name, email, username, password]
    );
    console.log(result);
  }
};

module.exports = User;
