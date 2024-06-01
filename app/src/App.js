import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate('/drawing');
  };

  const handleSkipClick = () => {
    navigate('/landing');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* <h1>Welcome to BC children Hospital Drawing App</h1> */}
      <img src={require('./assets/landing.png')} alt="animation" style={{ width: '300px', height: '300px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ marginBottom: '20px' }}>(animation video)</span>
        <button onClick={handleSkipClick} style={{ margin: '10px', padding: '10px 20px' }}>
          Skip
        </button>
        {/* <button onClick={handleGuestClick} style={{ margin: '10px', padding: '10px 20px' }}>
          Guest
        </button> */}
      </div>
    </div>
  );
};

export default App;
