const Post = require('../models/Post');
const PostController = {
  index(req, res) {
    Post.getAll((err, results) => {
      if (err) {
        console.log({ err });
        res.status(500).send('server error');
      } else {
        res.render('index', {
          title: 'Blog',
          posts: results,
          user: req.session.user
        });
      }
    });
  },

  getPost(req, res) {
    const { user, id } = req.params;

    Post.findPost(user, id, (err, results) => {
      if (err) {
        console.log({ err });
        res.status(500).send('server error');
      } else {
        res.render('post', {
          title: results[0].title,
          post: results[0],
          user: req.session.user
        });
      }
    });
  },
  addPostView(req, res) {
    if (req.session.user) {
      console.log(req.session.user);
      res.render('newpost', {
        title: 'New Post'
      });
    } else {
      res.redirect('/login');
    }
  },
  store(req, res) {
    const {
      body: { title, content },
      session: { user }
    } = req;
    Post.add(
      {
        title,
        content,
        author: user.username,
        created_at: Date.now().toString()
      },
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: 'server error' });
        } else {
          res.redirect('/');
        }
      }
    );
  }
};

module.exports = PostController;
