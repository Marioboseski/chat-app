type Props = {
  username: string,
  setUsername: (value: string) => void,
  room: string,
  setRoom: (value: string) => void,
  joinChat: () => void,
};

const Join = ({username, setUsername, room, setRoom, joinChat }: Props) => {

  return (
    <div className="flex flex-col justify-evenly items-center min-h-dvh">
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
        className="border-2 border-black p-1 rounded-md" />

      <button onClick={joinChat} className="border-2 border-black p-1 rounded-md">Join</button>
    </div>
  );
}

export default Join;