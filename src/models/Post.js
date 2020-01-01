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
  add({ title, description, content, author }, callback) {
    [title, description, content, author] = escape([
      title,
      description,
      content,
      author
    ]);
    connection.query(
      `INSERT INTO Posts (title, description, content, author, created_at) values (${title}, ${description}, ${content}, ${author}, NOW() )`,
      callback
    );
  }
};

function escape(values) {
  return values.map(value => connection.escape(value));
}

module.exports = Post;
