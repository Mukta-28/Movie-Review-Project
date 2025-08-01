import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111827',
            color: '#ffffff',
            border: '1px solid #374151',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
          },
          success: {
            style: {
              borderLeft: '4px solid #DC2626',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #DC2626',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
