import { useEffect, useState } from "react";
import { socket } from "./socket";

const App = () => {

  const [ message, setMessage ] = useState("");
  const [ messages, setMessages ] = useState<string[]>([]);

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

    socket.emit("sendMessage", message);
    setMessage("");
  }

  return (
    <div>
      <p>Chat App</p>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
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