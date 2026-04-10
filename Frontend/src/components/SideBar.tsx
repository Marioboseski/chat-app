type User = {
  id: string,
  username: string,
  room: string
};

type Props = {
  users: User[];
};

const SideBar = ({ users }: Props) => {
  return (
    <div className="w-1/4 border-r-2 border-gray-500 p-4">
      <h3 className="font-bold">Users in room:</h3>
      {users.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
}

export default SideBar;