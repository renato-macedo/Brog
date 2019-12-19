const mysql = require('mysql2');

// let connection;
// function connect() {
//   if (connection) {
//     return connection;
//   }

//   connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'blog'
//   });

//   return connection;
// }
// module.exports = connect();

function connect() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'blog'
  });
  const d = new Date();
  console.log('passei aqui', d.getSeconds());
  return connection;
}
module.exports = connect();
