import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterData } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, AtSign, Lock, User, Key } from 'lucide-react'; // Added Key icon

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData & { confirmPassword: string; secretKey?: string }>(); // Added secretKey in form type
  
  const password = watch('password', '');
  
  const onSubmit = async (
  data: RegisterData & { confirmPassword: string; secretKey?: string }
) => {
  setIsLoading(true);
  try {
    const { confirmPassword, secretKey, ...rest } = data;

   
    const registerData: RegisterData = {
      ...rest,
      adminKey: secretKey, 
    };

    await registerUser(registerData);
    navigate('/');
  } catch (error) {
    console.error('Registration error:', error);
  } finally {
    setIsLoading(false);
  }
};

  
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-800">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Create an Account</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.name ? 'border-accent-600' : 'border-gray-700'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-500`}
              placeholder="Your Name"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
          </div>
          {errors.name && (
            <p className="text-accent-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        {/* Email */}
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
        
        {/* Password */}
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
        
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.confirmPassword ? 'border-accent-600' : 'border-gray-700'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-500`}
              placeholder="••••••••"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-accent-600 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
            Role
          </label>
          <select
            id="role"
            {...register('role', { required: 'Role is required' })}
            className={`w-full pl-3 pr-3 py-2 border ${
              errors.role ? 'border-accent-600' : 'border-gray-700'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200`}
            defaultValue=""
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          {errors.role && (
            <p className="text-accent-600 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Secret Key - Only required if role is ADMIN */}
        {/** Show secret key field only if role selected is ADMIN */}
        {watch('role') === 'ADMIN' && (
          <div>
            <label htmlFor="secretKey" className="block text-sm font-medium text-gray-300 mb-1">
              Admin Secret Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="secretKey"
                type="password"
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.secretKey ? 'border-accent-600' : 'border-gray-700'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-500`}
                placeholder="Enter admin secret key"
                {...register('secretKey', {
                  required: 'Admin secret key is required',
                  validate: value =>
                    value === 'adminmovie' || 'Invalid secret key', // example check - backend should also verify
                })}
              />
            </div>
            {errors.secretKey && (
              <p className="text-accent-600 text-sm mt-1">{errors.secretKey.message}</p>
            )}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {isLoading ? (
            <>Creating account...</>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" /> Register
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:text-red-700 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
