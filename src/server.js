const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const routes = require('./routes');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'zepinote',
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('views', path.resolve(__dirname, 'views'));
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`server running on port http://127.0.0.1:${port}`)
);
