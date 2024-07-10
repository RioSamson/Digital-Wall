import React from 'react';
import {useNavigate} from 'react-router-dom';

function EmailVerificationPage() {

    const navigate = useNavigate();

    const handleLogin = async () => {
            navigate('/login');
      };
      
      const handleRegister = async () => {
        navigate('/register');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h2>Email Verification</h2>
        <p>We just sent an email to you. Click the link in the email to verify your account.</p>
        <button
        onClick={handleLogin}
        style={{ margin: '30px', padding: '10px 40px',backgroundColor: 'black', color:'white', border:'none', borderRadius:'5px' }}        
      >
        Click to login
      </button>
      <button
        onClick={handleRegister}
        style={{ margin: '30px', padding: '10px 40px',backgroundColor: 'white', color:'black', border:'solid black', borderRadius:'5px' }}        
      >
        Change Email
      </button>
    </div>
  )
}

export default EmailVerificationPage;