const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  password: '1234',
	  database: 'blog'
  });
 
  
  return connection;
}

module.exports = connect;
