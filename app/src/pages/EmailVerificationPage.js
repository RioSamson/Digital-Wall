import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmailVerificationPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/login');
  };

  const handleRegister = async () => {
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Email Verification</h2>
      <div style={styles.messageContainer}>
        <p style={styles.message}>We just sent an email to you. Click the link in the email to verify your account.</p>
      </div>
      <button
        onClick={handleLogin}
        style={{ ...styles.button, ...styles.loginButton }}
      >
        Click to login
      </button>
      <button
        onClick={handleRegister}
        style={{ ...styles.button, ...styles.registerButton }}
      >
        Change Email
      </button>
    </div>
    
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '0 10%',
    textAlign: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: '1.8rem',
    margin: '1rem 0',
    fontWeight: 'normal', 
  },
  messageContainer: {
    margin: '1rem 0',
  },
  message: {
    fontSize: '1rem',
  },
  button: {
    margin: '1rem',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%',
    maxWidth: '300px',
  },
  loginButton: {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
  },
  registerButton: {
    backgroundColor: 'white',
    color: 'black',
    border: '2px solid black',
  },
};

export default EmailVerificationPage;
