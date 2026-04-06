import { useEffect, useState } from "react";
import { socket } from "./socket";

type Message = {
  text: string,
  user: string
}

type User = {
  id: string,
  username: string,
  room: string
}

const App = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id)
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    })

    socket.on("roomUsers", (users) => {
      setUsers(users);
    })
    return () => {
      socket.off("connect")
      socket.off("receiveMessage")
      socket.off("roomUsers");
    }
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return

    socket.emit("sendMessage", {
      text: message,
      user: username
    })
    setMessage("");
  }

  const joinChat = () => {
    if (username.trim() === "" || room.trim() === "") return;

    socket.emit("join", {
      username,
      room
    })
    setIsJoined(true);
  }

  if (!isJoined) {
    return (
      <div className="flex flex-col justify-evenly items-center min-h-dvh">
        <h2>Enter Username and join room chat!</h2>
        <input type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black p-1 rounded-md" />
        <button onClick={joinChat} className="border-2 border-black p-1 rounded-md">Join</button>

        <input type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room"
          className="border-2 border-black p-1 rounded-md" />
      </div>
    )
  }
  return (
    <div className="flex min-h-dvh">

      <div className="w-1/4 border-r-2 border-gray-400 p-4">
        <h3 className="font-bold mb-2">Users</h3>
        {users.map((user, index) => (
          <p key={index}>{user.username}</p>
        ))}
      </div>

      <div className="w-3/4 flex flex-col">

        <div className="p-4 border-b-2 border-gray-400">
          <h2 className="font-bold">Room: {room}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => {
            const isMe = msg.user === username;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${isMe
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                    }`}>
                  <p className="text-sm">{msg.user}:</p>
                  <p className="text-lg">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 p-4 border-t-2 border-gray-400">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
            className="flex-1 p-2 border-2 border-gray-300 rounded-md" />
          <button
            onClick={sendMessage}
            className="bg-blue-400 text-white text-lg p-4 rounded-md">Send</button>
        </div>

      </div>
    </div>
  );
}

export default App;