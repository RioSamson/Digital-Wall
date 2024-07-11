import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();
  
    const handleSignup = async () => {
      if (!isSigningIn) {
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
        setIsSigningIn(true);
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          await sendEmailVerification(user);
          await setDoc(doc(db, "Users", email), {
            name:name,
            email: email,
            role: "Drawer",
            CreatedOn: serverTimestamp(),
            LastActivity: serverTimestamp()
          });
          setErrorMessage("Registration successful! Please check your email to verify your account.");
          navigate('/verification');
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setIsSigningIn(false);
        }
      }
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h2>Hello! Register to get started</h2>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300px', borderRadius:"5px", border:'solid 1px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300px', borderRadius:"5px", border:'solid 1px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300px', borderRadius:"5px", border:'solid 1px' }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300px', borderRadius:"5px", border:'solid 1px' }}
        />
        {errorMessage && (
          <div style={{ color: 'red', margin: '10px' }}>
            {errorMessage}
          </div>
        )}
        <button
          onClick={handleSignup}
          style={{ margin: '30px', padding: '10px 40px',backgroundColor: 'black', color:'white', border:'none', borderRadius:'5px' }}
          disabled={isSigningIn}
        >
          Register
        </button>
        <div style={{ marginTop: '20px' }}>
          <span>already have an account?</span>
          <Link to="/login" style={{ marginLeft: '5px', color: 'blue' }}>Login now</Link>
        </div>
        
      </div>
    );
}
