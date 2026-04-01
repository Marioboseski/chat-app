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

  socket.on("sendMessage", (message) => {
    console.log("Message received", message )

    io.emit("receiveMessage", message);
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

const PORT = 5000

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})