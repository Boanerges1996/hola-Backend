module.exports = function (io) {
  console.log("Socket now working");
  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("join", function (info) {
      // Pass user_id when joining
      socket.join(info.Id);
    });
  });
};
