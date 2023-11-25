// src/App.js
import './App.css';
import logoImage from './messagemelogo.png'; // Import the image
import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { auth } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password

  // Updated sign in function
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing in", error);
      });
  };

  // Sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
    }).catch((error) => {
      // An error happened.
      console.error("Error signing out", error);
    });
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <MessageList />
          <ChatInput userId={user.uid} />
          <button className="signOutButton" onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <div className="mainContainer">
          <div className="appDescription">
            <h1>Welcome to Message Me!</h1>
            <p>Connect with your friends and colleagues through instant messaging.</p>
            <img src={logoImage} alt="App Logo" className="appLogo" /> {/* Replace "image1" with your image path */}
          </div>
          <div className="signInContainer">
            <input
              type="email"
              className="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              className="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="signInButton" onClick={handleSignIn}>Sign In</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;