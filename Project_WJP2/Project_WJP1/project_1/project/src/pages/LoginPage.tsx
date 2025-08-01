import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Film } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="flex items-center mb-8">
        <Film className="h-10 w-10 text-white mr-2" />
        <h1 className="text-2xl font-bold text-white">CineReview</h1>
      </div>
      
      <LoginForm />
    </div>
  );
};

export default LoginPage;