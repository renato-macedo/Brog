const connection = require('../database/connection');

const Post = {
  async getAll() {
    const posts = await connection('posts')
      .orderBy('created_at', 'desc')
      .select('*');

    return posts;
  },

  async findPost(username, postID) {
    const [post] = await connection('posts')
      .where('author', username)
      .where('id', postID)
      .select('*');
    console.log(post);
    return post;
  },

  async insert({ title, description, content, author }) {
    const [id] = await connection('posts').insert({
      title,
      description,
      content,
      author
    });
    if (id) {
      return true;
    }

    return false;
  }
};

module.exports = Post;
