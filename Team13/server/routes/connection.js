const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blind",
  password: "postgres",
  port: process.env.PORT,
});

module.exports = pool;
