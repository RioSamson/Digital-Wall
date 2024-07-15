import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate("/SceneSelect", { state: { mode: "drawing" } });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontWeight: 'normal', marginBottom: '200px', marginTop: '20px' }}>ArtSpark</h1>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={handleLoginClick}
          style={{
            margin: '10px',
            padding: '15px 100px',
            fontSize: '1.125rem', 
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        <button
          onClick={handleGuestClick}
          style={{
            margin: '10px',
            padding: '15px 100px',
            fontSize: '1.125rem',
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Guest
        </button>
      </div>
    </div>
  );
};

export default App;
