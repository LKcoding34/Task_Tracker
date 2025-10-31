import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css'

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear token or auth state
    navigate('/'); // Redirect to login page
  };

  return (
    <>
    <h1 className="heading">End Tasks</h1>
    <button onClick={handleLogout}>
      Logout
    </button>
    </>
  );
}
