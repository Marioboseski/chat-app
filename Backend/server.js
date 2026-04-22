const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const setupSocket = require("./socket");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-app-mario.netlify.app"
    ],
  })
);
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-app-mario.netlify.app",
    ],
  },
});

setupSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});