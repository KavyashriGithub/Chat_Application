const database = require("../config/knex");
const { v4: uuidv4 } = require("uuid");

exports.createMessage = async (sender_id, receiver_id, message) => {
  const value= new Date()
  console.log("new Date()",value)
 return await database("messages").insert({
    id: uuidv4(),
    sender_id,
    receiver_id,
    message,
    created_at:new Date()
  });
};

exports.getMessagesBetweenUsers = async (senderId, receiverId) => {
  return await database("messages")
    .where(function () {
      this.where("sender_id", senderId).andWhere(
        "receiver_id",
        receiverId
      );
    })
    .orWhere(function () {
      this.where("sender_id", receiverId).andWhere(
        "receiver_id",
        senderId
      );
    })
    .orderBy("created_at", "asc");
};
// exports.getMessages = async (senderId, receiverId) => {
//   return await db('messages')
//     .where(function () {
//       this.where('sender_id', senderId).andWhere('receiver_id', receiverId);
//     })
//     .orWhere(function () {
//       this.where('sender_id', receiverId).andWhere('receiver_id', senderId);
//     })
//     .orderBy('created_at', 'asc'); // optional: order messages by time
// };

// exports.getMessages = async (user1, user2) => {
//   return await database("messages")
//     .where(function () {
//       this.where({ sender_id: user1, receiver_id: user2 })
//         .orWhere({ sender_id: user2, receiver_id: user1 });
//     })
//     .orderBy("created_at", "asc");
// };