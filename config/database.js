import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'homire',
  port: 3307
});

export default pool;
