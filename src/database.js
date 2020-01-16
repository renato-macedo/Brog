const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'blog'
  });
  //const d = new Date();
  console.log('passei aqui');
  return connection;
}

module.exports = connect;
