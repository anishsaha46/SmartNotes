import React from 'react';
import { Link } from 'react-router-dom';
import { BookText, Edit, Search, Tag } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Capture Your Ideas with SmartNotes
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A powerful note-taking app that helps you organize your thoughts, ideas, and tasks in one place.
        </p>
        <div className="flex justify-center space-x-4">
          {user ? (
            <Link to="/notes">
              <Button size="lg">
                Go to My Notes
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Edit size={24} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">Easy Note Creation</h2>
          <p className="text-gray-600 text-center">
            Create beautiful notes with a rich text editor. Add formatting, images, and more to your notes.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Tag size={24} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">Organize with Tags</h2>
          <p className="text-gray-600 text-center">
            Keep your notes organized with tags. Easily find related notes with a simple tag search.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Search size={24} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">Powerful Search</h2>
          <p className="text-gray-600 text-center">
            Find your notes instantly with our powerful search feature. Search by title, content, or tags.
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <BookText size={48} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Join thousands of users who organize their thoughts with SmartNotes.
        </p>
        {user ? (
          <Link to="/notes">
            <Button size="lg">
              Go to My Notes
            </Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button size="lg">
              Create Free Account
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;