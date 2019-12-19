const User = require('../models/User');
const UserController = {
  index(req, res) {
    User.findUsers((err, results) => {
      if (err) {
        console.log({ err });
        res.status(500).send('server error');
      } else {
        res.render('index', { users: results });
      }
    });
  }
};

module.exports = UserController;
