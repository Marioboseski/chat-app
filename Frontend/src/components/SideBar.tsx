import { useChatStore } from "../store/chatStore";
import { Circle } from "lucide-react";

const SideBar = () => {

  const users = useChatStore((s) => s.users);
  
  return (
    <div className="w-1/4 border-r-2 border-gray-500 p-4">
      <h3 className="font-bold">Users in room:</h3>
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-3">
          <Circle size={10} className="bg-green-500 " />
        <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
}

export default SideBar;