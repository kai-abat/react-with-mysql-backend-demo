const mysql = require("mysql2/promise");
const POOL = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin1234",
  database: "test_form",
});

module.exports = {
  POOL,
};
