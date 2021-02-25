const mysql = require('mysql');
require('dotenv').config();

const { HOST, USER, PASSWORD, DATABASE } = process.env;

const db = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});

db.getConnection((err) => {
  if (err) throw err;
  console.log('MySQL is connected...');
});

module.exports = db;
