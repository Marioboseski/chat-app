const { addUser, removeUser, getUsersByRoom } = require("./users");

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", ({ username, room }) => {
      socket.username = username;
      socket.room = room;

      socket.join(room);

      addUser({
        id: socket.id,
        username,
        room,
      });

      io.to(room).emit("roomUsers", getUsersByRoom(room));
    });

    socket.on("sendMessage", (data) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      io.to(socket.room).emit("receiveMessage", {
        text: data.text,
        user: data.user,
        time
      });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);

      if (socket.room) {
        io.to(socket.room).emit(
          "roomUsers",
          getUsersByRoom(socket.room)
        );
      }
    });
  });
};

module.exports = setupSocket;