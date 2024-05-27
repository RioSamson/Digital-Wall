import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/gallery');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login Page</h1>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        style={{ margin: '10px', padding: '10px', width: '300px' }}
      />
      <button 
        onClick={handleLogin} 
        style={{ margin: '10px', padding: '10px 20px' }}
      >
        Login
      </button>
    </div>
  );
}
