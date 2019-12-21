const express = require('express');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const AuthController = require('./controllers/AuthController');

const router = express.Router();

router.get('/', PostController.index);
router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.get('/users', UserController.index);
router.get('/posts', PostController.index);

router.get('/html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = router;
