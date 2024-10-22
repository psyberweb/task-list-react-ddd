import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      const token = response.data.accessToken;
      const user = response.data.user;
      login(token, user);
      console.log('Login:', { email, password });
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      const err = error as any;
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <a href="/auth/register">Register</a>
    </form>
  );
};

export default Login;