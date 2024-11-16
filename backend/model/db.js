const mysql = require("mysql2/promise");
require("dotenv").config();
const POOL = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin1234",
  database: "test_form",
});

// const POOL = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

module.exports = {
  POOL,
};
