import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import MainApp from './pages/MainApp';
import SubscriptionPage from './pages/SubscriptionPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleLogin = (email: string, subscribed: boolean) => {
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
      return <LandingPage onLogin={handleLogin} />;
    }
    if (!isSubscribed) {
      return <SubscriptionPage onSubscribe={handleSubscription} userEmail={loggedInUser} />;
    }
    return <MainApp onLogout={handleLogout} userEmail={loggedInUser} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {renderContent()}
    </div>
  );
};

export default App;
