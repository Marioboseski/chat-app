const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

let users = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("join", ({ username, room }) => {
    socket.username = username;
    socket.room = room;

    socket.join(room);

    users.push({
      id: socket.id,
      username,
      room,
    });
    io.to(room).emit("roomUsers", users.filter(user => user.room === room));
    console.log(`${username} joined room ${room}`);
  })

  socket.on("sendMessage", (data) => {
    io.to(socket.room).emit("receiveMessage", {
      text: data.text,
      user: data.user
    })
  })

  socket.on("disconnect", () => {
    users = users.filter(user => user.id !== socket.id);

    if (socket.room) {
      io.to(socket.room).emit(
        "roomUsers", users.filter(user => user.room === socket.room)
      );
    }
    console.log("User disconnected:", socket.id)
  })
})

const PORT = 5000

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})