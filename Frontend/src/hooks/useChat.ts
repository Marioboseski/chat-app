import { useEffect, useState } from "react";
import { socket } from "../socket";

type Message = {
  text: string,
  user: string
}

type User = {
  id: string,
  username: string,
  room: string
}

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id)
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    })

    socket.on("roomUsers", (users) => {
      setUsers(users);
    })
    return () => {
      socket.off("connect")
      socket.off("receiveMessage")
      socket.off("roomUsers");
    }
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return

    socket.emit("sendMessage", {
      text: message,
      user: username
    })
    setMessage("");
  }

  const joinChat = () => {
    if (username.trim() === "" || room.trim() === "") return;

    socket.emit("join", {
      username,
      room
    })
    setIsJoined(true);
  };

  return {
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
  }
};