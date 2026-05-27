const { Server } = require("socket.io");
const messageModel = require("./models/message");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, message } = data;

      await messageModel.createMessage(senderId, receiverId, message);

      io.to(receiverId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};