const express = require('express');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Blog de Corno'
  });
});

router.get('/users', UserController.index);
router.get('/posts', PostController.index);

router.get('/html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = router;
