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
  add({ title, content, author }, callback) {
    [title, content, author] = escape([title, content, author]);
    connection.query(
      `INSERT INTO Posts (title, content, author, created_at) values (${title}, ${content}, ${author}, NOW() )`,
      callback
    );
  }
};

function escape(values) {
  return values.map(value => connection.escape(value));
}

module.exports = Post;
