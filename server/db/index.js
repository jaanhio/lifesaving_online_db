const pg = require("pg");
require('dotenv').load();

const dbConfig = {
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  port: process.env.db_port
};

const pool = new pg.Pool(dbConfig);
pool.on("error", function(err) {
  winston.error("idle client error", err.message, err.stack);
});

module.exports = {
  pool,
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
