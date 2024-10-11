import React, { useState, useEffect } from 'react';
import { UserService } from '../../../aplication/services/UserService';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { User } from '../../../domain/entities/User';

const userService = new UserService(new UserRepository());

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    async function fetchUsers() {
      const allUsers = await userService.getAllUsers();
      setUsers(allUsers);
    }
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    await userService.createUser(newUser.name, newUser.email, newUser.password, newUser.phone);
    setNewUser({ name: '', email: '', password: '', phone: '' });
    const allUsers = await userService.getAllUsers();
    setUsers(allUsers);
  };

  const handleDeleteUser = async (id: string) => {
    await userService.deleteUser(id);
    const allUsers = await userService.getAllUsers();
    setUsers(allUsers);
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id.value}>
            {user.name} - {user.email} - {user.phone}
            <button onClick={() => handleDeleteUser(user.id.value)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Create New User</h3>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newUser.phone}
        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default UserList;
