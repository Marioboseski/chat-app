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

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("join", (username) => {
    socket.username = username
    console.log(username, "joined chat")
  })

  socket.on("sendMessage", (data) => {
    console.log("Message received", data )

    io.emit("receiveMessage", {
      text: data.text,
      user: data.user
    });
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

const PORT = 5000

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})