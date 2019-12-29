const User = require('../models/User');
const UserController = {
  loginSubmit(req, res) {
    //req.session.user = user
    const { email, password } = req.body;
    if (email && password) {
      User.findByEmail(email, (err, results) => {
        if (results && results.length > 0) {
          const user = results[0];
          if (user.password === password) {
            req.session.user = user;
            res.redirect('/');
          } else {
            return res.render('login', {
              title: 'Welcome',
              errors: ['wrong password']
            });
          }
        } else {
          res.render('login', {
            title: 'Welcome',
            errors: ['could not find user']
          });
        }
      });
    } else {
      res.render('login', {
        title: 'Welcome',
        errors: ['fill all fields']
      });
    }
  },

  registerSubmit(req, res) {
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

    User.findByEmail(email, (err, results) => {
      if (results && results.length > 0) {
        res.render('register', {
          title,
          errors: ['A user with this email already exists']
        });
      } else {
        User.findByUsername(username, (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log('aaa', results);
          if (results && results.length > 0) {
            res.render('register', {
              title,
              errors: ['this is username is already taken']
            });
          } else {
            User.store({ name, username, email, password }, (err, results) => {
              if (err) {
                console.log(err);
                res.render('register', {
                  title,
                  errors: ['something is wrong']
                });
              } else {
                console.log({ results });
                req.session.user = { name, username, email, password };
                res.redirect('/');
              }
            });
          }
        });
      }
    });

    // return res.render('register', {
    //   error: 'Please, fill all fields'
    // });
  },

  logout(req, res) {
    req.session.user = null;
    return res.redirect('/');
  }
};

module.exports = UserController;
