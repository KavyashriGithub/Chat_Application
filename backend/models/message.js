const database = require("../config/knex");
const { v4: uuidv4 } = require("uuid");

exports.createMessage = async (sender_id, receiver_id, message) => {
  await database("messages").insert({
    id: uuidv4(),
    sender_id,
    receiver_id,
    message
  });
};

exports.getMessages = async (user1, user2) => {
  return await database("messages")
    .where(function () {
      this.where({ sender_id: user1, receiver_id: user2 })
        .orWhere({ sender_id: user2, receiver_id: user1 });
    })
    .orderBy("created_at", "asc");
};