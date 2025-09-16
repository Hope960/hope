
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

const Loader: React.FC = () => {
  const [message, setMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = LOADING_MESSAGES.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
        return LOADING_MESSAGES[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-gray-100 mb-2">Generating Your Video...</h2>
      <p className="text-gray-400 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default Loader;
