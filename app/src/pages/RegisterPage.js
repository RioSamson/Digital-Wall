import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";

/**
 * RegisterPage component
 * 
 * This component provides a registration form for new users to create an account.
 * It includes email verification and stores user information in Firestore.
 * 
 * @component
 * @example
 * return (
 *   <RegisterPage />
 * )
 */
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
  
    /**
     * Handles user signup
     */
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
            name: name,
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

    /**
     * Styles for the RegisterPage component
     */
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
          <span style={styles.highlight}>Hello!</span>
          <span style={styles.newline}> Register to start</span>
        </h2>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        {errorMessage && (
          <div style={styles.errorMessage}>
            {errorMessage}
          </div>
        )}
        <button
          onClick={handleSignup}
          style={styles.button}
          disabled={isSigningIn}
        >
          Register
        </button>
        <div style={{ marginTop: '20px' }}>
          <span style={{ fontSize: '16px', fontWeight: 400 }}>Already have an account?</span>
          <Link to="/login" style={styles.link}>Login now</Link>
        </div>
      </div>
    );
}
