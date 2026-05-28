const express = require("express");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const userRoutes = require("./routes/user");
const userChatRoutes = require("./routes/userCharts");
const messageRoutes = require("./routes/message");
const  {initSocket}= require("./socket");
const groupRoutes = require("./routes/groups");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", userChatRoutes);
app.use("/api", messageRoutes);
app.use("/api", groupRoutes);
app.get("/", (req, res) => {
  res.status(200).send("Hello from the backend!");
});
const server = http.createServer(app);
// Initialize socket once
initSocket(server);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});