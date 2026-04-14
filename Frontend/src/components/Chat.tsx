import Messages from "./Messages";

type Message = {
  text: string,
  user: string
  time: string
}

type Props = {
  messages: Message[],
  username: string,
  message: string,
  setMessage: (value: string) => void,
  sendMessage: () => void,
}

const Chat = ({ messages, username, message, setMessage, sendMessage }: Props) => {
  return (
    <div className="w-3/4 flex flex-col h-dvh">
      <Messages messages={messages} username={username} />

      <div className="flex gap-2 p-4 border-t-2 border-gray-500">
        <input type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => {
            if(e.key === "Enter") {
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