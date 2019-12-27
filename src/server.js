const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const connection = require('./database');
const routes = require('./routes');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'zepinote',
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('views', 'src/views');
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`server running on port http:127.0.0.1:${port}`)
);
