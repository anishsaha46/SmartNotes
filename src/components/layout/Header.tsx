import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BookText, LogOut, Plus } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  const isNotesPath = location.pathname.includes('/notes');
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg mr-2 shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
            <BookText size={20} />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SmartNotes
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && (
            <Link 
              to="/notes" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              My Notes
            </Link>
          )}
          
          {user && isNotesPath && (
            <Link to="/notes/new">
              <Button size="sm" variant="outline" className="transform hover:-translate-y-0.5 transition-transform duration-200">
                <Plus size={16} className="mr-1" />
                New Note
              </Button>
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 hidden sm:block">
                {user.email}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut size={16} className="mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;