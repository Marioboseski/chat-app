import { useEffect } from "react";
import { socket } from "../socket";
import { useChatStore } from "../store/chatStore";

export const useSocket = () => {
  const setMessages = useChatStore((store) => store.setMessages);
  const setUsers = useChatStore((store) => store.setUsers);
  const setTyping = useChatStore((store) => store.setTyping);
  const clearTyping = useChatStore((store) => store.clearTyping);
  const markMessageSeen = useChatStore((store) => store.markMessageSeen);
  const username = useChatStore((store) => store.username);
  const messages = useChatStore((store) => store.messages);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages(data);
    });

    socket.on("roomUsers", (users) => {
      setUsers(users);
    });

    socket.on("typing", (username) => {
      setTyping(username);
    });

    socket.on("stopTyping", () => {
      clearTyping();
    });

    socket.on("messageSeen", (id) => {
      markMessageSeen(id);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("roomUsers");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("messageSeen");
    };
  }, []);

  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.user !== username && msg.status !== "seen") {
        socket.emit("markSeen", msg.id);
      }
    });
  }, [messages, username]);
};