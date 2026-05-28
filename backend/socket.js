const { Server } = require("socket.io");
const database = require("./config/knex");
const { v4: uuidv4 } = require("uuid");
const groupMessageModel = require("./models/groupMessage");
let io;
// store online users
let onlineUsers = {};
exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
//     socket.on("typing", (data) => {
//   io.to(data.receiverId).emit("showTyping", {
//     senderId: data.senderId
//   });
// });

// socket.on("stopTyping", (data) => {
//   io.to(data.receiverId).emit("hideTyping", {
//     senderId: data.senderId
//   });
// });

  //  Handle user joining
    socket.on("join", (userId) => {
console.log("user joined",userId)
  if (!onlineUsers[userId]) {
    onlineUsers[userId] = [];
    io.emit("userOnline", userId);
  }

  onlineUsers[userId].push(socket.id);

  socket.join(userId); 
  
  socket.emit("onlineUsers", Object.keys(onlineUsers));
});
    // join group room
    socket.on("joinGroup", (groupId) => {    
      socket.join(groupId);
    });


    // private message
    socket.on("sendMessage", async (data) => {
      console.log("new Date",new Date())
      await database("messages").insert({
        id: uuidv4(),
        sender_id: data.senderId,
        receiver_id: data.receiverId,
        message: data.message,
        created_at: new Date()
      });
      io.to(data.receiverId).emit("receiveMessage", data);
//       io.to(data.receiverId).emit("receiveMessage", {
//   ...data,
//   type: "private"
// });
    });
    // group message
// socket.on("sendGroupMessage", async (data) => {
//   try {
//     await database("group_messages").insert({
//       id: uuidv4(),
//       group_id: data.groupId,
//       sender_id: data.senderId,
//       message: data.message,
//       created_at: new Date()
//     });
//   } catch (err) {
//     console.log("Error saving group message:", err);
//   }
//   io.to(data.groupId).emit("receiveGroupMessage", data);
// });

socket.on("sendGroupMessage", async (data) => {

  try {

    const messageId = uuidv4();

    await database("group_messages").insert({
      id: messageId,
      group_id: data.groupId,
      sender_id: data.senderId,
      message: data.message,
      created_at: new Date()
    });

    // fetch message with username
    const message = await database("group_messages")
      .join("user", "group_messages.sender_id", "user.id")
      .select(
        "group_messages.id",
        "group_messages.group_id",
        "group_messages.sender_id",
        "user.user_name",
        "group_messages.message",
        "group_messages.created_at"
      )
      .where("group_messages.id", messageId)
      .first();

    io.to(data.groupId).emit("receiveGroupMessage", message);


  } catch (err) {

    console.log("Error saving group message:", err);

  }

});

// message seen double tick implementation
// socket.on("messageSeen", async (data) => {
//   try {

//     await database("messages")
//       .where({
//         sender_id: data.senderId,
//         receiver_id: data.receiverId,
//         seen: 0
//       })
//       .update({ seen: 1 });

//     io.to(data.senderSocket).emit("messageSeenUpdate", {
//       receiverId: data.receiverId
//     });

//   } catch (err) {
//     console.error(err);
//   }
// });
// Disconnect or detect offline users
socket.on("disconnect", () => {

  for (let userId in onlineUsers) {

    onlineUsers[userId] = onlineUsers[userId].filter(
      (id) => id !== socket.id
    );

    if (onlineUsers[userId].length === 0) {
      delete onlineUsers[userId];
      io.emit("userOffline", userId);
    }

  }

});
    });
    }