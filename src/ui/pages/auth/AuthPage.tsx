import React from 'react';
import Login from '../../components/auth/Login';

const AuthPage: React.FC = () => {
  return (
    <div>
      <h1>Authentication</h1>
      <Login />
    </div>
  );
};

export default AuthPage;