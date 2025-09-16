import React, { useState } from 'react';
import LandingPage from './pages/LandingPage.js';
import MainApp from './pages/MainApp.js';
import SubscriptionPage from './pages/SubscriptionPage.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email, subscribed) => {
    if (email) {
      setIsLoggedIn(true);
      setLoggedInUser(email);
      setIsSubscribed(subscribed);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setIsSubscribed(false);
  };

  const handleSubscription = () => {
    if(loggedInUser) {
      const userData = JSON.parse(localStorage.getItem(loggedInUser) || '{}');
      userData.subscribed = true;
      localStorage.setItem(loggedInUser, JSON.stringify(userData));
      setIsSubscribed(true);
    }
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return React.createElement(LandingPage, { onLogin: handleLogin });
    }
    if (!isSubscribed) {
      return React.createElement(SubscriptionPage, { onSubscribe: handleSubscription, userEmail: loggedInUser });
    }
    return React.createElement(MainApp, { onLogout: handleLogout, userEmail: loggedInUser });
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-900 text-white' },
    renderContent()
  );
};

export default App;
