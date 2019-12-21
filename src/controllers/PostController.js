const Post = require('../models/Post');
const PostController = {
  index(req, res) {
    Post.getAll((err, results) => {
      if (err) {
        console.log({ err });
        res.status(500).send('server error');
      } else {
        res.render('index', { title: 'Blog', posts: results });
      }
    });
  }
};

module.exports = PostController;
