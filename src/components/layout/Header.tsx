import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BookText, LogOut, User, Plus } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, signOut, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  const isNotesPath = location.pathname.includes('/notes');
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-blue-600">
          <BookText size={24} className="mr-2" />
          <span className="font-bold text-xl">SmartNotes</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && (
            <Link to="/notes" className="text-blue-600 hover:text-blue-800">
              My Notes
            </Link>
          )}
          
          {user && isNotesPath && (
            <Link to="/notes/new">
              <Button size="sm" variant="outline">
                <Plus size={16} className="mr-1" />
                New Note
              </Button>
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                {user.email}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                isLoading={loading}
              >
                <LogOut size={16} className="mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">
                <User size={16} className="mr-1" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;