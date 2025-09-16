import React from 'react';

const PlanCard = ({ planName, price, priceDetails, features, isPopular, onSubscribe }) => React.createElement(
  'div',
  { className: `relative flex flex-col p-8 bg-gray-800 rounded-2xl border border-gray-700 shadow-lg ${isPopular ? 'border-indigo-500' : ''}` },
  isPopular && React.createElement(
    'div',
    { className: 'absolute top-0 -translate-y-1/2 w-full flex justify-center' },
    React.createElement('span', { className: 'bg-indigo-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase' }, 'Most Popular')
  ),
  React.createElement('h3', { className: 'text-xl font-semibold text-white' }, planName),
  React.createElement(
    'p',
    { className: 'mt-4' },
    React.createElement('span', { className: 'text-4xl font-extrabold text-white tracking-tight' }, `$${price}`),
    React.createElement('span', { className: 'text-base font-medium text-gray-400' }, `/${priceDetails}`)
  ),
  React.createElement(
    'ul',
    { role: 'list', className: 'mt-6 space-y-4 flex-grow' },
    features.map((feature, index) =>
      React.createElement(
        'li',
        { key: index, className: 'flex items-start' },
        React.createElement(
          'svg',
          { className: 'flex-shrink-0 h-6 w-6 text-green-400', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'aria-hidden': 'true' },
          React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M5 13l4 4L19 7' })
        ),
        React.createElement('span', { className: 'ml-3 text-base text-gray-300' }, feature)
      )
    )
  ),
  React.createElement(
    'button',
    {
      onClick: onSubscribe,
      className: `w-full mt-8 py-3 px-6 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/50
      ${isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-600 text-white hover:bg-gray-500'}`
    },
    'Choose Plan'
  )
);

const SubscriptionPage = ({ onSubscribe, userEmail }) => {
  return React.createElement(
    'div',
    { className: 'flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8' },
    React.createElement(
      'main',
      { className: 'w-full max-w-4xl mx-auto' },
      React.createElement(
        'div',
        { className: 'text-center mb-10' },
        React.createElement('h1', { className: 'text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500' }, 'Choose Your Plan'),
        React.createElement(
          'p',
          { className: 'mt-4 text-lg text-gray-400 max-w-2xl mx-auto' },
          'Welcome, ',
          React.createElement('span', { className: 'font-semibold text-indigo-300' }, userEmail),
          '! Unlock the full potential of our AI video generator with a subscription.'
        )
      ),
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 gap-8' },
        React.createElement(PlanCard, {
          planName: 'Monthly',
          price: '10',
          priceDetails: 'month',
          features: ['Unlimited video generations', 'All aspect ratios', 'Standard processing queue', 'Email support'],
          onSubscribe: onSubscribe
        }),
        React.createElement(PlanCard, {
          planName: 'Yearly',
          price: '100',
          priceDetails: 'year',
          features: ['Everything in Monthly', 'Save 20% with annual billing', 'Priority processing queue', 'Priority support'],
          isPopular: true,
          onSubscribe: onSubscribe
        })
      ),
      React.createElement(
        'div',
        { className: 'text-center mt-12' },
        React.createElement(
          'p',
          { className: 'text-sm text-gray-500' },
          'This is a simulated payment process for demonstration purposes.',
          React.createElement('br'),
          'Clicking \'Choose Plan\' will grant you full access to the application.'
        )
      ),
      React.createElement(
        'footer',
        { className: 'text-center mt-8 text-gray-500 text-sm' },
        React.createElement('p', null, 'Powered by Stripe & Google\'s Gemini API')
      )
    )
  );
};

export default SubscriptionPage;
