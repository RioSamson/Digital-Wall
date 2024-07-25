import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { doc, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const db = getFirestore(); 

  const handleLogin = async () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        const userRef = doc(db, "Users", email);
        await updateDoc(userRef, {
          LastActivity: serverTimestamp()
        });
        navigate('/selection');
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      marginTop: ' 80px',
      gap: '32px'
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    },
    input: {
      padding: '15px',
      width: '320px',
      borderRadius: '10px',
      border: 'solid 1px',
      background: 'white',
      fontSize: '16px',
      boxSizing: 'border-box'
    
    },
    button: {
      padding: '12px 116px',
      backgroundColor: 'black',
      width: '320px',
      height: '56px',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '24px',
      boxSizing: 'border-box'
    },
    link: {
      marginLeft: '5px',
      color: 'black',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 700
    },
    errorMessage: {
      color: 'red',
      margin: '10px'
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
      color: 'black',
      textAlign: 'center'
    },
    highlight: {
      color: '#F3801F',
    },
    newline: {
      display: 'block'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>
        <span style={styles.highlight}>Welcome!</span><span style={styles.newline}> Glad to see you</span>
      </h2>
      <div style={styles.inputContainer}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      </div>
      
      {errorMessage && (
        <div style={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
      <button
        onClick={handleLogin}
        style={styles.button}
        disabled={isSigningIn}
      >
        Login
      </button>
      <div style={{ marginTop: '70px' }}>
        <span style={{fontSize: '16px', fontWeight:400}}>Don't have an account?</span>
        <Link to="/register" style={styles.link}>Create Account</Link>
      </div>
    </div>
  );
}