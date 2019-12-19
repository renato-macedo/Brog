const express = require('express');
const connection = require('./database');
const routes = require('./routes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`server running on port http:127.0.0.1:${port}`)
);
