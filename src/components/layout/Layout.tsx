import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      <main className="flex-grow py-6">
        <Outlet />
      </main>
      <footer className="bg-white py-4 border-t border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SmartNotes App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;