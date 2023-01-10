const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "friends",
});

module.exports = connection;
