import React, { useState, useEffect } from "react";
import { User } from "../../../domain/entities/User";

interface UserFormProps {
  onSubmit: (user: {
    name: string;
    email: string;
    password: string;
    phone: string;
    roles: number[];
  }) => void;
  onCancel: () => void;
  initialUser?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  initialUser,
}) => {
  const isUpdate = !!initialUser;
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    roles: [] as number[],
  });

  useEffect(() => {
    if (initialUser) {
      setUserForm({
        name: initialUser.name,
        email: initialUser.email,
        password: '', //initialUser.password,
        phone: initialUser.phone,
        roles: initialUser.roles || [],
      });
    }
  }, [initialUser]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      const roleValue = parseInt(value, 10);
      setUserForm((prevForm) => ({
        ...prevForm,
        roles: checked
          ? [...prevForm.roles, roleValue]
          : prevForm.roles.filter((role) => role !== roleValue),
      }));
    } else {
      setUserForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUpdate && !userForm.password) {
      alert("Password is required for new users.");
      return;
    }
  
    if (isUpdate && userForm.password === '') {
      userForm.password = ''; // mantem o mesmo password
    }
  
    console.log("Submitting form", userForm);
    onSubmit(userForm);
    //setUserForm({ name: "", email: "", password: "", phone: "", roles: [] });
  };
  console.log("userForm", userForm, initialUser)
  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userForm.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userForm.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Roles</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="roles"
                value="1"
                checked={userForm.roles.includes(1)}
                onChange={handleChange}
              />
              Admin
            </label>
            <label>
              <input
                type="checkbox"
                name="roles"
                value="2"
                checked={userForm.roles.includes(2)}
                onChange={handleChange}
              />
              User
            </label>
          </div>
        </div>
        <button type="submit">
          {initialUser ? "Update User" : "Submit User"}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
