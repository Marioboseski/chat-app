import { useEffect, useState } from "react";
import { socket } from "./socket";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";

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
        <h2 className="text-2xl">Enter Username and join room chat!</h2>
        <input type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black p-1 rounded-md" />

        <input type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room"
          className="border-2 border-black p-1 rounded-md" />

        <button onClick={joinChat} className="border-2 border-black p-1 rounded-md">Join</button>
      </div>
    )
  }
  return (
    <div className="flex h-dvh">
      <SideBar users={users} />

      <Chat messages={messages}
        username={username}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage} />
    </div>
  );
}

export default App;