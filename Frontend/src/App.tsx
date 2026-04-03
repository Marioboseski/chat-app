import { useEffect, useState } from "react";
import { socket } from "./socket";

type Message = {
  text: string,
  user: string
}

const App = () => {

  const [ message, setMessage ] = useState("");
  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ username, setUsername ] = useState("");
  const [ isJoined, setIsJoined ] = useState(false);
  const [ room, setRoom ] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id)

      socket.on("receiveMessage", (data) => {
        setMessages((prev) => [...prev, data]);
      })
    })
    return () => {
      socket.off("connect")
      socket.off("receiveMessage")
    }
  },[]);

  const sendMessage = () => {
    if(!message.trim()) return

    socket.emit("sendMessage", {
      text: message,
      user: username
    })
    setMessage("");
  }

  const joinChat = () => {
    if(username.trim() === "" || room.trim() === "") return;

    socket.emit("join", {
      username,
      room
    })
    setIsJoined(true);
  }

  if(!isJoined) {
    return (
      <div>
        <h2>Enter Username</h2>
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
        <button onClick={joinChat}>Join</button>

        <input type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room" />
      </div>
    )
  }
  return (
    <div>
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
    </div>
  );
}

export default App;