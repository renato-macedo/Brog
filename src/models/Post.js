const connection = require('../database');
// models são interfaces para o banco de dados
const Post = {
  getAll(callback) {
    connection.query(`SELECT * FROM Posts ORDER BY created_at DESC`, callback);
  },
  findPost(username, postID, callback) {
    connection.query(
      `SELECT * FROM Posts where author ='${username}' and post_id = ${postID}`,
      callback
    );
  },
  insert({ title, content, author, created_at }) {
    connection.query(
      `INSERT INTO Posts (title, content, author, created_at) values (${title}, ${content}, ${author}, ${created_at} )`
    );
  }
};

module.exports = Post;
