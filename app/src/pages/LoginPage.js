import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import { doc, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";

export default function LoginPage() {
  const { userLoggedIn } = useAuth();
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
        // Update LastActivity on successful login
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


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>ArtSpark</h1>
      <input
        type="email"
        placeholder="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '300px' }}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '300px' }}
      />
      {errorMessage && (
        <div style={{ color: 'red', margin: '10px' }}>
          {errorMessage}
        </div>
      )}
      <button
        onClick={handleLogin}
        style={{ margin: '30px', padding: '10px 40px',backgroundColor: 'black', color:'white', border:'none', borderRadius:'5px' }}
        disabled={isSigningIn}
        
      >
        Login
      </button>
      <div style={{ marginTop: '20px' }}>
        <span>Don't have an account?</span>
        <Link to="/register" style={{ marginLeft: '5px', color: 'orange',textDecoration: 'none'  }}>Create Account</Link>
      </div>
    </div>
  );
}
