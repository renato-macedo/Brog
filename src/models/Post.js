const connect = require('../database');

// models são interfaces para o banco de dados

function createPostModel() {
  let connection;
  function setConnection() {
    connect().then(c => (connection = c));
  }
  setConnection();

  const Post = {
    async getAll() {
      const [rows] = await connection.query(
        `SELECT * FROM Posts ORDER BY created_at DESC`
      );
      return rows;
    },
    async findPost(username, postID) {
      console.log(username, postID);
      const [
        results
      ] = await connection.query(
        `SELECT * FROM Posts where author = ? and post_id = ?  `,
        [username, postID]
      );

      return results;
    },
    async insert({ title, description, content, author }) {
      try {
        await connection.query(
          `INSERT INTO Posts (title, description, content, author, created_at) values (?, ?, ?, ?, NOW() )`,
          [title, description, content, author]
        );
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    }
  };
  return Post;
}

module.exports = createPostModel();

//module.exports = new Post();
