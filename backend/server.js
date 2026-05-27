const express = require("express");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const userRoutes = require("./routes/user");
const userChatRoutes = require("./routes/userCharts");
const messageRoutes = require("./routes/message");
const { initSocket } = require ("./socket");



const app = express();


app.use(express.json());

// app.use(cors()({
//     origin: "*",
//     methods: ["GET", "POST","PATCH" ,"PUT", "DELETE"],
// }))


app.use(cors());

app.use('/api',userRoutes);
app.use('/api',userChatRoutes);
app.use("/api", messageRoutes);
app.get("/", (req, res) => {
    res.status(200).send("Hello from the backend!");
});
const server = http.createServer(app);
initSocket(server);
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`)
//     // console.log (`signup URL: http://localhost:${process.env.PORT}/signup`);

// });
const PORT = process.env.PORT || 8080;
server.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
});

