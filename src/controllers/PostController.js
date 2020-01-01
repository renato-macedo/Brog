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
  addPostPage(req, res) {
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
    const { user } = req.session;
    if (user) {
      const {
        body: { title, content, description }
      } = req;
      console.log({ description });
      Post.add(
        {
          title,
          content,
          description,
          author: user.username
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
    } else {
      res.redirect('/login');
    }
  }
};

module.exports = PostController;
