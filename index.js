const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIO = require("socket.io");
const http = require("http");

// Database importation
const dbServer = require("./connections/dbConnection");

// Various routes
const User = require("./routes/user");

dotenv.config();

const app = express();
dbServer.connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
require("./connections/socketConnection")(io);

// io.on("connection", (socket) => {
//   // Each user joins a specific room in the socket
//   console.log("connected");
//   socket.on("join", function (info) {
//     console.log(info.Id);

//     socket.join(info.Id);
//   });
// });

app.use("/user", User);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
module.exports = { io };
