import { useEffect } from "react";
import { socket } from "../socket";
import { useChatStore } from "../store/chatStore";

export const useSocket = () => {
  const setMessages = useChatStore((s) => s.setMessages);
  const setUsers = useChatStore((s) => s.setUsers);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages(data);
    });

    socket.on("roomUsers", (users) => {
      setUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("roomUsers");
    };
  }, []);
};