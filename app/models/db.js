const mysql = require("mysql");
require('dotenv').config();

const dbConfig = process.env;
var connection = mysql.createConnection({
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
