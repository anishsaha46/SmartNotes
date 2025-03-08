import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { signIn, signUp, loading, error } = useAuthStore();

  const validateForm = () => {
    setValidationError('');
    
    if (type === 'register' && password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (type === 'login') {
      const success = await signIn(email, password);
      if (success) {
        navigate('/notes');
      }
    } else {
      const success = await signUp(email, password);
      if (success) {
        navigate('/notes');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </h2>
        
        {(error || validationError) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {validationError || error}
          </div>
        )}
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          fullWidth
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          fullWidth
        />
        
        {type === 'register' && (
          <p className="mt-1 text-sm text-gray-600">
            Password must be at least 6 characters long.
          </p>
        )}
        
        <div className="mt-6">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={loading}
          >
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;