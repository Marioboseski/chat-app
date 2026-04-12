import { useChat } from "./hooks/useChat";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";

const App = () => {

  const {
    message,
    setMessage,
    messages,
    username,
    setUsername,
    room,
    setRoom,
    users,
    isJoined,
    sendMessage,
    joinChat,
  } = useChat();

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