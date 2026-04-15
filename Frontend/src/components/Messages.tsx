import { useEffect, useRef } from "react"
import { useChatStore } from "../store/chatStore";

const Messages = () => {

  const messages = useChatStore((s) => s.messages);
  const username = useChatStore((s) => s.username);
    
  const messagesEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({behavior: "smooth"});
  },[messages])

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => {
        const isMe = msg.user === username;

        return (
          <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`p-2 rounded-lg max-w-xs ${isMe
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
              }`}>
              <p className="text-sm">{msg.user} :</p>
              <p className="text-lg">{msg.text}</p>
              <p className="text-xs opacity-50">{msg.time}</p>
            </div>
          </div>
        )
      })}
      <div ref={messagesEnd} />
    </div>
  );
}

export default Messages;