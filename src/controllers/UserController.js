const User = require('../models/User');
const UserController = {
  async loginSubmit(req, res) {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findByEmail(email);

      if (user) {
        if (user.password === password) {
          const { user_id: id, username, name, email } = user;
          req.session.user = { id, name, username, email };
          return res.redirect('/');
        }
        return res.render('login', {
          title: 'Welcome',
          errors: ['wrong password']
        });
      }
      return res.render('login', {
        title: 'Welcome',
        errors: ['could not find user']
      });
    }
    return res.render('login', {
      title: 'Welcome',
      errors: ['fill all fields']
    });
  },

  async registerSubmit(req, res) {
    const title = 'Sign Up Now';
    const { name, username, email, password, password2 } = req.body;
    const errors = [];
    if (!name || !username || !email || !password || !password2) {
      errors.push('Please, fill all fields');
    }

    if (password2 !== password) {
      errors.push('Password does not match');
    }

    if (password.length < 6) {
      errors.push('Password must have at least 6 characters');
    }

    if (errors.length > 0) {
      return res.render('register', {
        title,
        errors
      });
    }

    try {
      const [exists, message] = await User.checkIfExists(email, username);
      if (exists) {
        return res.render('register', {
          title,
          errors: [message]
        });
      }
      await User.store({ name, username, email, password });
      req.session.user = { name, username, email, password };
      return res.redirect('/');
    } catch (e) {
      console.log(e);
      return res.render('register', {
        title,
        errors: ['something is wrong']
      });
    }
  },

  logout(req, res) {
    req.session.user = null;
    return res.redirect('/');
  }
};

module.exports = UserController;
