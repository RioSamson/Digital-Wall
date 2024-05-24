import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate('/drawing');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to BC children Hospital Drawing App</h1>
      <button onClick={handleGuestClick} style={{ margin: '10px', padding: '10px 20px' }}>
        Continue as Guest
      </button>
      <button onClick={handleLoginClick} style={{ margin: '10px', padding: '10px 20px' }}>
        Login to retrieve previous drawings
      </button>
    </div>
  );
};

export default App;
