import { useEffect } from "react";
import { socket } from "../socket";
import { useChatStore } from "../store/chatStore";

export const useSocket = () => {
  const setMessages = useChatStore((s) => s.setMessages);
  const setUsers = useChatStore((s) => s.setUsers);
  const setTyping = useChatStore((s) => s.setTyping);
  const clearTyping = useChatStore((s) => s.clearTyping);

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

    return () => {
      socket.off("receiveMessage");
      socket.off("roomUsers");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);
};