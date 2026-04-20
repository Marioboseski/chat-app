import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import Join from "./components/Join";
import { useChatStore } from "./store/chatStore";
import { useSocket } from "./hooks/useSocket";

const App = () => {

  useSocket();

  const isJoined = useChatStore((store) => store.isJoined);

  if (!isJoined) {
    return <Join />
  }

  return (
    <div className="flex h-dvh">
      <SideBar />
      <Chat />
    </div>
  );
}

export default App;