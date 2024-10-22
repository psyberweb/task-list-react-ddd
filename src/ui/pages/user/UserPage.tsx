import React, { useState, useEffect } from "react";
import UserList from "../../components/users/UserList";
import UserForm from "../../components/users/UserForm";
import UserDetail from "../../components/users/UserDetail";
import { UserService } from "../../../aplication/services/UserService";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { User } from "../../../domain/entities/User";

const userService = new UserService(new UserRepository());

const UserPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("list");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      const allUsers = await userService.getAllUsers();
      setUsers(allUsers);
    }
    fetchUsers();
    setSelectedPage("list");
  }, []);

  const handleCreateOrUpdateUser = async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    roles: number[];
  }) => {
    if (selectedUser) {
      const updatedUser = new User(
        selectedUser.id,
        userData.name,
        userData.email,
        userData.email,
        userData.password,
        userData.phone,
        userData.roles
      );
      await userService.updateUser(updatedUser);
    } else {
      await userService.createUser(
        userData.name,
        userData.email,
        userData.password,
        userData.phone,
        userData.roles
      );
    }
    const allUsers = await userService.getAllUsers();
    setUsers(allUsers);
    setSelectedUser(null); // Limpa o formulário após a criação/edição
    setSelectedPage("list");
  };

  const handleNewUser = () => {
    setSelectedUser(null);
    setSelectedPage("form");
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPage("detail");
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPage("form");
  };

  const handleDeleteUser = async (id: string) => {
    await userService.deleteUser(id);
    const allUsers = await userService.getAllUsers();
    setUsers(allUsers);
    setSelectedPage("list");
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setSelectedPage("list");
  };

  return (
    <div>
      {selectedPage === "list" && (
      <UserList
        users={users}
        onSelectUser={handleSelectUser}
        onDeleteUser={handleDeleteUser}
        onAddNewUser={handleNewUser}
        onEditUser={handleEditUser}
      />
    )}
    {selectedPage === "form" && (
      <UserForm
        onSubmit={handleCreateOrUpdateUser}
        onCancel={handleCancel}
        initialUser={selectedUser}
      />
    )}
    {selectedPage === "detail" && (
      <UserDetail
        user={selectedUser}
        onCancel={handleCancel}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    )}
    </div>
  );
};

export default UserPage;
