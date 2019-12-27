const express = require('express');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const AuthController = require('./controllers/AuthController');

const router = express.Router();

router.get('/', PostController.index);
router.get('/login', AuthController.loginPage);
router.post('/login/submit', AuthController.loginSubmit);
router.get('/register', AuthController.registerPage);
router.get('/users', UserController.index);
router.get('/posts', PostController.index);
router.get('/:user/:id', PostController.getPost);

router.get('/html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = router;
