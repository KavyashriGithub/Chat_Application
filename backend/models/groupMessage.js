const database = require("../config/knex");
const { v4: uuidv4 } = require("uuid");

exports.saveGroupMessage = async (group_id, sender_id, message) => {
  await database("group_messages").insert({
    id: uuidv4(),
    group_id,
    sender_id,
    message,
    created_at: new Date()
  });
};
exports.getGroupMessages = async (group_id) => {
  const data = await database("group_messages")
    .join("user", "group_messages.sender_id", "user.id")
    .select(
      "group_messages.id",
      "group_messages.group_id",
      "group_messages.sender_id",
      "user.user_name",
      "group_messages.message",
      "group_messages.created_at"
    )
    .where("group_messages.group_id", group_id)
    .orderBy("group_messages.created_at", "asc");
    return data;
};

// exports.getGroupMessages = async (group_id) => {
//   return await database("group_messages")
//     .where("group_id", group_id )
//     .orderBy("created_at", "asc");
// };