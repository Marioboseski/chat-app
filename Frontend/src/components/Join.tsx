type Props = {
  username: string,
  setUsername: (value: string) => void,
  room: string,
  setRoom: (value: string) => void,
  joinChat: () => void,
};

const Join = ({ username, setUsername, room, setRoom, joinChat }: Props) => {

  const isDisabled = !username.trim() || !room.trim();

  return (
    <div className="flex justify-center items-center p-3 min-h-dvh w-full">
      <form className="flex flex-col justify-evenly items-center text-center min-h-[500px] w-full max-w-md border-2 border-black rounded-lg">
        <h2 className="text-2xl">Enter Username and join room chat!</h2>
        <input type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black p-1 rounded-md w-full max-w-xs" />

        <input type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room"
          className="border-2 border-black p-1 rounded-md w-full max-w-xs"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              joinChat();
            }
          }}
        />

        <button onClick={joinChat} className={`p-1 rounded-md w-full max-w-32 bg-gray-300 text-lg hover:bg-gray-400
        ${isDisabled ? "opacity-65 cursor-not-allowed" : ""}`}>Join</button>
      </form>
    </div>
  );
}

export default Join;