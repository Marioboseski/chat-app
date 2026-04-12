import { useChat } from "./hooks/useChat";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import Join from "./components/Join";

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

  if(!isJoined) {
    return (
      <Join 
      username={username}
      setUsername={setUsername}
      room={room}
      setRoom={setRoom}
      joinChat={joinChat} />
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