import Messages from "./Messages";
import { useChatStore } from "../store/chatStore";
import { socket } from "../socket";
import { useRef } from "react";

const Chat = () => {

  const message = useChatStore((store) => store.message);
  const setMessage = useChatStore((store) => store.setMessage);
  const sendMessage = useChatStore((store) => store.sendMessage);

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null> (null);

  return (
    <div className="w-3/4 flex flex-col h-dvh">
      <Messages />

      <div className="flex gap-2 p-4 border-t-2 border-gray-500">
        <input type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("typing");

            if(typingTimeout.current) {
              clearTimeout(typingTimeout.current);
            }

            typingTimeout.current = setTimeout(() => {
              socket.emit("stopTyping");
            }, 1000);
          }}

          placeholder="Type message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md w-full" />
        <button onClick={sendMessage} className="bg-blue-400 text-white text-lg p-4 rounded-md hover:bg-blue-500">Send</button>
      </div>
    </div>
  );
}

export default Chat;