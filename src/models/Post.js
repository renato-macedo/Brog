const connection = require('../database');
// models são interfaces para o banco de dados
const Post = {
  findPosts(callback) {
    connection.query('SELECT * FROM POSTS', callback);
  }
};

module.exports = Post;
