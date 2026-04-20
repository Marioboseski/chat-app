import { useEffect, useRef } from "react"
import { useChatStore } from "../store/chatStore";

const Messages = () => {

  const messages = useChatStore((store) => store.messages);
  const username = useChatStore((store) => store.username);

  const messagesEnd = useRef<HTMLDivElement | null>(null);

  const isTyping = useChatStore((store) => store.isTyping);
  const typingUser = useChatStore((store) => store.typingUser);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      {messages.map((msg) => {
        const isMe = msg.user === username;

        return (
          <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`p-2 rounded-lg max-w-xs ${isMe
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
              }`}>
              <div className="w-full max-w-32">
                <p className="text-sm">{msg.user} :</p>
                <p className="text-lg">{msg.text}</p>
                <p className="text-xs opacity-50">{msg.time}</p>
                {isMe && (
                  <p>{msg.status === "seen" ? "seen" : "delivered"}</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
      {isTyping && typingUser !== username && (
        <p className="text-sm text-gray-600 italic">{typingUser} is typing...</p>
      )}
      <div ref={messagesEnd} />
    </div>
  );
}

export default Messages;