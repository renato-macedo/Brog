const connection = require('../database/connection');

const User = {
  async findByEmail(email) {
    const [user] = await connection('users')
      .where('email', email)
      .select('*');

    if (user) {
      return user;
    }
    return null;
  },

  async checkIfExists(email, username) {
    const results = await connection('users')
      .where('email', email)
      .orWhere('username', username)
      .select('*');

    const [user] = results;

    if (user) {
      if (user.email == email) {
        return [true, 'A user with this email already exists'];
      }

      if (user.username == username) {
        return [true, 'this is username is already taken'];
      }
    }
    return [false, null];
  },

  async store({ name, username, email, password }) {
    const [user] = await connection('users').insert({
      name,
      email,
      username,
      password
    });
    console.log(user);
  },

  async findByUsername(username) {
    const [user] = await connection('users')
      .where('username', username)
      .select('*');

    if (user) {
      return user;
    }
    return null;
  }
};

module.exports = User;
