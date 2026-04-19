export type Message = {
  id: string,
  text: string,
  user: string,
  time: string,
  status: "sent" | "delivered" | "seen"
}

export type User = {
  id: string,
  username: string,
  room: string
};