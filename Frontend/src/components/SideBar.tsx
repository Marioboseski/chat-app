import { useChatStore } from "../store/chatStore";

const SideBar = () => {

  const users = useChatStore((s) => s.users);
  
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