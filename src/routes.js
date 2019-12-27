const express = require('express');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

const router = express.Router();

router.get('/', PostController.index);

router.get('/login', (req, res) => {
  return res.render('login', {
    title: 'Login'
  });
});

router.post('/login/submit', UserController.loginSubmit);

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Sign Up'
  });
});

router.post('/register/submit', UserController.registerSubmit);

//router.get('/users', UserController.index);
//router.get('/posts', PostController.index);
router.get('/:user/:id', PostController.getPost);

router.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

router.get('/html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = router;
