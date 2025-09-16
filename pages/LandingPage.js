import React, { useState } from 'react';

const LandingPage = ({ onLogin }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const clearMessages = () => {
    setAuthError('');
    setAuthMessage('');
  };

  const handleEmailChange = (e) => {
    clearMessages();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    clearMessages();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearMessages();

    if (mode === 'signup') {
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters long.');
        return;
      }
      if (localStorage.getItem(email)) {
        setAuthError('An account with this email already exists.');
        return;
      }
      const newUser = {
        password: password,
        subscribed: false,
      };
      localStorage.setItem(email, JSON.stringify(newUser));
      setAuthMessage('Sign up successful! Please log in.');
      setMode('login');
      setPassword('');
    } else { // Login mode
      const userDataString = localStorage.getItem(email);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.password === password) {
          onLogin(email, userData.subscribed);
        } else {
          setAuthError('Invalid email or password.');
        }
      } else {
        setAuthError('Invalid email or password.');
      }
    }
  };

  const toggleMode = () => {
    clearMessages();
    setEmail('');
    setPassword('');
    setMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
  };

  return React.createElement(
    'div',
    { className: 'flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8' },
    React.createElement(
      'main',
      { className: 'w-full max-w-md mx-auto' },
      React.createElement(
        'div',
        { className: 'text-center mb-10' },
        React.createElement('h1', { className: 'text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500' }, 'Image to Video Generator'),
        React.createElement('p', { className: 'mt-4 text-lg text-gray-400' }, 'Bring your images to life. Upload a picture, describe the scene, and let AI create a video.')
      ),
      React.createElement(
        'div',
        { className: 'bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700' },
        React.createElement(
          'form',
          { onSubmit: handleSubmit },
          React.createElement('h2', { className: 'text-xl font-bold text-center text-gray-200 mb-6' }, mode === 'login' ? 'Log In' : 'Create an Account'),
          React.createElement(
            'div',
            null,
            React.createElement('label', { htmlFor: 'email', className: 'block text-sm font-medium text-gray-300 mb-2' }, 'Email Address'),
            React.createElement('input', {
              id: 'email', name: 'email', type: 'email', autoComplete: 'email', required: true, value: email, onChange: handleEmailChange,
              className: 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
              placeholder: 'you@example.com'
            })
          ),
          React.createElement(
            'div',
            { className: 'mt-4' },
            React.createElement('label', { htmlFor: 'password', className: 'block text-sm font-medium text-gray-300 mb-2' }, 'Password'),
            React.createElement('input', {
              id: 'password', name: 'password', type: 'password', autoComplete: mode === 'login' ? 'current-password' : 'new-password', required: true, value: password, onChange: handlePasswordChange,
              className: 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
              placeholder: '••••••••'
            })
          ),
          authError && React.createElement('p', { className: 'mt-4 text-sm text-red-400 text-center' }, authError),
          authMessage && React.createElement('p', { className: 'mt-4 text-sm text-green-400 text-center' }, authMessage),
          React.createElement(
            'div',
            { className: 'mt-6' },
            React.createElement('button', {
              type: 'submit', disabled: !email || !password,
              className: 'w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-indigo-500/50'
            }, mode === 'login' ? 'Log In' : 'Sign Up')
          )
        ),
        React.createElement(
          'div',
          { className: 'mt-6 text-center' },
          React.createElement('button', { onClick: toggleMode, className: 'text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors' }, mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Log In')
        )
      ),
      React.createElement(
        'footer',
        { className: 'text-center mt-8 text-gray-500 text-sm' },
        React.createElement('p', null, 'Powered by Google\'s Gemini API')
      )
    )
  );
};

export default LandingPage;
