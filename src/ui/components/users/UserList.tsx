import React from "react";
import { User } from "../../../domain/entities/User";

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onAddNewUser: () => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onSelectUser,
  onDeleteUser,
  onEditUser,
  onAddNewUser,
}) => {
  return (
    <div>
      <h2>User List</h2>
      <button onClick={onAddNewUser}>Add New User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id.value}>
            {user.name} - {user.email} - {user.phone}
            <button onClick={() => onSelectUser(user)}>Select</button>
            <button onClick={() => onEditUser(user)}>Edit</button>
            <button onClick={() => onDeleteUser(user.id.value)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
