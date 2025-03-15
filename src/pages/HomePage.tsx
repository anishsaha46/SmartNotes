import React from 'react';
import { Link } from 'react-router-dom';
import { BookText, Sparkles, Brain, Zap } from 'lucide-react';
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
          A powerful AI-enhanced note-taking app that helps you organize thoughts, generate content, and summarize information effortlessly.
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
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
              <Sparkles size={24} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">AI-Powered Content Generation</h2>
          <p className="text-gray-600 text-center">
            Let AI help you generate creative content, expand your ideas, and overcome writer's block instantly.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Brain size={24} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">Smart Summarization</h2>
          <p className="text-gray-600 text-center">
            Quickly summarize long notes into concise key points with our AI summarization feature.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <Zap size={24} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-3">Intelligent Organization</h2>
          <p className="text-gray-600 text-center">
            Smart tagging and organization suggestions to keep your notes structured and easily accessible.
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <BookText size={48} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Experience the future of note-taking with AI-powered features that help you write, organize, and understand better.
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