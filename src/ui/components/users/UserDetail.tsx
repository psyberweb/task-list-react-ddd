import React from "react";
import { User } from "../../../domain/entities/User";

interface UserDetailProps {
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onCancel: () => void;
  user: User | null;
}

const UserDetail: React.FC<UserDetailProps> = ({
  user,
  onEditUser,
  onDeleteUser,
  onCancel,
}) => {
  if (!user) {
    return <div>No user selected</div>;
  }

  return (
    <div>
      <div>
        <h2>User Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
      <div>
        <h3>Roles</h3>
        <ul>
          {user.roles && user.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => onEditUser(user)}>Edit User</button>
        <button onClick={() => onDeleteUser(user.id.toString())}>
          Delete User
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default UserDetail;
