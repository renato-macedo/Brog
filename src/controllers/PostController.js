const Post = require('../models/Post');

const PostController = {
  async index(req, res) {
    const results = await Post.getAll();
    return res.render('index', {
      title: 'Blog',
      posts: results,
      user: req.session.user
    });
  },

  async getPost(req, res) {
    const { user, id } = req.params;
    try {
      const post = await Post.findPost(user, id);
      return res.render('post', {
        title: post.title,
        post: post,
        user: req.session.user
      });
    } catch (error) {
      res.send('server error:' + error.message);
    }
  },
  addPostPage(req, res) {
    if (req.session.user) {
      res.render('newpost', {
        title: 'New Post'
      });
    } else {
      res.redirect('/login');
    }
  },
  async store(req, res) {
    const { user } = req.session;
    if (user) {
      const {
        body: { title, content, description }
      } = req;

      const success = await Post.insert({
        title,
        content,
        description,
        author: user.username
      });
      if (success) {
        return res.redirect('/');
      }

      return res.send('server error');
    } else {
      res.redirect('/login');
    }
  }
};

module.exports = PostController;
