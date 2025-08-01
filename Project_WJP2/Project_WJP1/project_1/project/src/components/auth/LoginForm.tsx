import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, AtSign, Lock } from 'lucide-react';


const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  
  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      // Error toast is shown in the auth context
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-800">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Log In to CineReview</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.email ? 'border-accent-600' : 'border-gray-700'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-500`}
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-accent-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.password ? 'border-accent-600' : 'border-gray-700'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-500`}
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-accent-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {isLoading ? (
            <>Signing in...</>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" /> Sign In
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500 hover:text-red-700 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;