import { create } from "zustand";
import { socket } from "../socket";
import type { Message, User } from "../types";

type ChatStore = {
  message: string,
  messages: Message[],
  username: string,
  room: string,
  users: User[],
  isJoined: boolean

  setMessage: (value: string) => void,
  setUsername: (value: string) => void,
  setRoom: (value: string) => void,

  sendMessage: () => void,
  joinChat: () => void,
  setMessages: (message: Message) => void,
  setUsers: (users: User[]) => void, 
};

export const useChatStore = create<ChatStore>((set, get) => ({
  message: "",
  messages: [],
  username: "",
  room: "",
  users: [],
  isJoined: false,

  setMessage: (value) => set({ message: value }),
  setUsername: (value) => set({ username: value }),
  setRoom: (value) => set({ room: value }),

  setMessages: (message) => 
    set((state) => ({
      messages: [...state.messages, message],
    })),

    setUsers: (users) => set({ users }),

    sendMessage: () => {
      const { message, username } = get();

      if(!message.trim()) return;

      socket.emit("sendMessage", {
        text: message,
        user: username,
      });
      set({ message: "" });
    },

    joinChat: () => {
      const { username, room } = get();

      if(!username.trim() || !room.trim()) return;

      socket.emit("join", { username, room });

      set({ isJoined: true });
    },
}))
