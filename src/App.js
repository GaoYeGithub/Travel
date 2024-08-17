import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebase';
import Login from './components/Login';
import Logout from './components/Logout';
import FAQHub from './components/FAQHub';
import React from 'react';
import './CSS/App.css';
import InfoList from './InfoList';
import TravelData from "./data";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <FAQHub />
          <InfoList />
          <Logout />
        </div>
      ) : (
        <div>
          <FAQHub />
          <TravelData />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
