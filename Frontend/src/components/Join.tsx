type Props = {
  username: string,
  setUsername: (value: string) => void,
  room: string,
  setRoom: (value: string) => void,
  joinChat: () => void,
};

const Join = ({ username, setUsername, room, setRoom, joinChat }: Props) => {

  return (
    <div className="flex justify-center items-center p-2 min-h-dvh w-full">
      <div className="flex flex-col justify-evenly items-center min-h-[500px] w-full max-w-md border-2 border-black">
        <h2 className="text-2xl">Enter Username and join room chat!</h2>
        <input type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black p-1 rounded-md" />

        <input type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room"
          className="border-2 border-black p-1 rounded-md"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              joinChat();
            }
          }}
        />

        <button onClick={joinChat} className="border-2 border-black p-1 rounded-md">Join</button>
      </div>
    </div>
  );
}

export default Join;