const AuthController = {
  loginPage(req, res) {
    res.render('login', {
      title: 'Login'
    });
  },
  loginSubmit(req, res) {
    //req.session.user = user
    console.log(req.body);
    res.render('index', { title: 'kk' });
  },
  registerPage(req, res) {
    res.render('register', {
      title: 'Sign Up'
    });
  }
};

module.exports = AuthController;
