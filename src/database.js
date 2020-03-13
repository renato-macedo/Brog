const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'blog'
  });
 
  
  return connection;
}

module.exports = connect;
