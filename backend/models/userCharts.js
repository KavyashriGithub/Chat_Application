const database = require("../config/knex");

exports.getAllUser = async () => {
    const data = await database("user").select('user_name')
    return data;
}