const config = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "config/database.db"
        },
        useNullAsDefault: true    

    }
}
  module.exports = config










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