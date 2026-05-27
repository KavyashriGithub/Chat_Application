// const knex = require('knex')
// const config = require('./knexfile')

//     const dbConnection = knex(config.development)
//     dbConnection.raw("SELECT 1").then(() => {
//         console.log("Database connection successful");
//     }
//     ).catch((err) => {
//         console.error("Database connection failed:", err);
//     });
//     module.exports = dbConnection





const knex = require("knex");
const config = require("./knexfile");

const dbConnection = knex({
  ...config.development,

  pool: {
    afterCreate: (conn, done) => {
      // Wait if database is busy instead of throwing error
      conn.run("PRAGMA busy_timeout = 5000;", (err) => {
        if (err) {
          console.error("Failed to set busy_timeout:", err);
        }
        done(err, conn);
      });
    }
  }
});

// Enable WAL mode (prevents database lock issues)
dbConnection.raw("PRAGMA journal_mode = WAL;")
  .then(() => {
    console.log("WAL mode enabled");
  })
  .catch((err) => {
    console.error("Failed to enable WAL:", err);
  });

// Test connection
dbConnection.raw("SELECT 1")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

module.exports = dbConnection;
