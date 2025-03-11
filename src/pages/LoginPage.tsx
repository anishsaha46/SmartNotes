import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={18} className="mr-1" />
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
        <AuthForm type="login" />
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;