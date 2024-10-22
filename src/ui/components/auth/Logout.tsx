import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const AuthLink: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    logout();
    console.log('Logout');
    navigate('/', { replace: true });
  };

  return (
    <div>
      {token ? (
        <a href="/" onClick={handleLogout}>Logout</a>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </div>
  );
};

export default AuthLink;