import React from 'react';

interface SubscriptionPageProps {
  onSubscribe: () => void;
  userEmail: string | null;
}

const PlanCard: React.FC<{
  planName: string;
  price: string;
  priceDetails: string;
  features: string[];
  isPopular?: boolean;
  onSubscribe: () => void;
}> = ({ planName, price, priceDetails, features, isPopular, onSubscribe }) => (
  <div className={`relative flex flex-col p-8 bg-gray-800 rounded-2xl border border-gray-700 shadow-lg ${isPopular ? 'border-indigo-500' : ''}`}>
    {isPopular && (
      <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
        <span className="bg-indigo-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">Most Popular</span>
      </div>
    )}
    <h3 className="text-xl font-semibold text-white">{planName}</h3>
    <p className="mt-4">
      <span className="text-4xl font-extrabold text-white tracking-tight">${price}</span>
      <span className="text-base font-medium text-gray-400">/{priceDetails}</span>
    </p>
    <ul role="list" className="mt-6 space-y-4 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg className="flex-shrink-0 h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="ml-3 text-base text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onSubscribe}
      className={`w-full mt-8 py-3 px-6 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/50
      ${isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-600 text-white hover:bg-gray-500'}`}
    >
      Choose Plan
    </button>
  </div>
);


const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onSubscribe, userEmail }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Welcome, <span className="font-semibold text-indigo-300">{userEmail}</span>! Unlock the full potential of our AI video generator with a subscription.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PlanCard
            planName="Monthly"
            price="10"
            priceDetails="month"
            features={['Unlimited video generations', 'All aspect ratios', 'Standard processing queue', 'Email support']}
            onSubscribe={onSubscribe}
          />
          <PlanCard
            planName="Yearly"
            price="100"
            priceDetails="year"
            features={['Everything in Monthly', 'Save 20% with annual billing', 'Priority processing queue', 'Priority support']}
            isPopular={true}
            onSubscribe={onSubscribe}
          />
        </div>

        <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
                This is a simulated payment process for demonstration purposes.
                <br/>
                Clicking 'Choose Plan' will grant you full access to the application.
            </p>
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Stripe & Google's Gemini API</p>
        </footer>
      </main>
    </div>
  );
};

export default SubscriptionPage;