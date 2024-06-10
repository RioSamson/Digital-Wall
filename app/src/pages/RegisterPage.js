import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";

export default function RegisterPage() {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();
  
    const handleSignup = async () => {
      if (!isSigningIn) {
        setIsSigningIn(true);
        try {
          await doCreateUserWithEmailAndPassword(email, password);
          // Create user document in Firestore after successful registration
          await setDoc(doc(db, "Users", email), {
            email: email,
            role: "Drawer",
            CreatedOn: serverTimestamp(),
            LastActivity: serverTimestamp()
          });
          navigate('/gallery');
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setIsSigningIn(false);
        }
      }
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Register</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300px' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300bs' }}
        />
        {errorMessage && (
          <div style={{ color: 'red', margin: '10px' }}>
            {errorMessage}
          </div>
        )}
        <button
          onClick={handleSignup}
          style={{ margin: '10px', padding: '10px 20px' }}
          disabled={isSigningIn}
        >
          Sign Up
        </button>
        <div style={{ marginTop: '20px' }}>
          <span>already have an account?</span>
          <Link to="/login" style={{ marginLeft: '5px', color: 'blue' }}>Login</Link>
        </div>
        
      </div>
    );
}
