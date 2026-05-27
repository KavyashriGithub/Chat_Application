// const config = {
//     development: {
//         client: "sqlite3",
//         connection: {
//             filename: "config/database.db"
//         },
//         useNullAsDefault: true    

//     }
// }
//   module.exports = config

const path = require("path");

console.log("DB PATH:", path.join(__dirname, "database.db"));

const config = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "database.db")
    },
    useNullAsDefault: true
  }
};

module.exports = config;