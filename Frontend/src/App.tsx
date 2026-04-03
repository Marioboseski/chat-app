import { useEffect, useState } from "react";
import { socket } from "./socket";

type Message = {
  text: string,
  user: string
}

type User = {
  id: number,
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
    <div className="flex flex-col justify-evenly items-center min-h-dvh">
      <p>Chat App</p>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.user}:</p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <input type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..." />
      <button onClick={sendMessage}>Send</button>

      <div>
        <h3>Users in rooms</h3>
        {users.map((user, index) => (
          <p key={index}>{user.username}</p>
        ))}
      </div>
    </div>
  );
}

export default App;