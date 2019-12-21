const AuthController = {
  login(req, res) {
    res.render('login', {
      title: 'Login'
    });
  },
  register(req, res) {
    res.render('register', {
      title: 'Sign Up'
    });
  }
};

module.exports = AuthController;
