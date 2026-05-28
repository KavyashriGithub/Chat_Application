const knex = require('knex')
const config = require('./knexfile')

    const dbConnection = knex(config.development)
    dbConnection.raw("SELECT 1").then(() => {
        console.log("Database connection successful");
    }
    ).catch((err) => {
        console.error("Database connection failed:", err);
    });
    module.exports = dbConnection







// const knex = require("knex");

// const db = knex({
//   client: "sqlite3",
//   connection: {
//     filename: "./config/database.db"
//   },
//   useNullAsDefault: true,
//   pool: {
//     afterCreate: (conn, done) => {
//       conn.run("PRAGMA journal_mode = WAL;");
//       conn.run("PRAGMA busy_timeout = 5000;");
//       done(null, conn);
//     }
//   }
// });

// module.exports = db;
