import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate('/drawing');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* <h1>Welcome to BC children Hospital Drawing App</h1> */}
      <img src={require('../assets/login.png')} alt="Login" style={{ width: '300px', height: '300px', marginBottom: '20px' }} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={handleLoginClick} style={{ margin: '10px', padding: '10px 20px' }}>
          Login
        </button>
        <button onClick={handleGuestClick} style={{ margin: '10px', padding: '10px 20px' }}>
          Guest
        </button>
      </div>
    </div>
  );
}
