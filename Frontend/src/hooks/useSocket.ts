import { useEffect } from "react";
import { socket } from "../socket";
import { useChatStore } from "../store/chatStore";

export const useSocket = () => {
  const setMessages = useChatStore((s) => s.setMessages);
  const setUsers = useChatStore((s) => s.setUsers);
  const setTyping = useChatStore((s) => s.setTyping);
  const clearTyping = useChatStore((s) => s.clearTyping);
  const markMessageSeen = useChatStore((s) => s.markMessageSeen);
  const username = useChatStore((s) => s.username);
  const messages = useChatStore((s) => s.messages);

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