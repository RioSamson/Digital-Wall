import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EmailVerificationPage component
 * 
 * This component displays a message prompting the user to verify their email and provides
 * options to navigate to the login or registration page to change the email.
 * 
 * @component
 * @example
 * return (
 *   <EmailVerificationPage />
 * )
 */
function EmailVerificationPage() {
  const navigate = useNavigate();

  /**
   * Navigates to the login page
   */
  const handleLogin = async () => {
    navigate('/login');
  };

  /**
   * Navigates to the registration page
   */
  const handleRegister = async () => {
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Email Verification</h2>
      <div style={styles.messageContainer}>
        <p style={styles.message}>
          We just sent an email to you. Click the link in the email to verify your account.
        </p>
      </div>
      <button
        onClick={handleLogin}
        style={{ ...styles.button, ...styles.loginButton }}
      >
        Login
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

/**
 * Styles for the EmailVerificationPage component
 */
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
    fontSize: '32px',
    margin: '18px 0',
    fontWeight: 600,
  },
  messageContainer: {
    marginTop: '10px',
    marginBottom: "100px",
  },
  message: {
    fontSize: '16px',
    fontWeight: 500,
  },
  button: {
    width: '320px',
    height: '56px',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '24px',
    boxSizing: 'border-box',
    margin: '10px',
  },
  loginButton: {
    padding: '12px 116px',
    backgroundColor: 'black',
    color: 'white',
  },
  registerButton: {
    backgroundColor: "#F8F8F8",
    color: "black",
  },
};

export default EmailVerificationPage;
