import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Film, Menu, X, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-black fixed top-0 left-0 w-full z-50 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-red-600 hover:text-white">
              <Film className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold tracking-wider">CineReview</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex ml-10 space-x-6">
              <Link to="/" className="hover:text-red-600 transition font-medium">Home</Link>
              <Link to="/about" className="hover:text-red-600 transition font-medium">About</Link>
              <Link to="/contact" className="hover:text-red-600 transition font-medium">Contact</Link>
            </div>
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">Hi, {user?.name}</span>
                {isAdmin && (
                  <Link to="/admin" className="text-sm font-medium hover:text-red-600 transition">
                    Admin Panel
                  </Link>
                )}
                <Link to="/dashboard" className="text-sm font-medium hover:text-red-600 transition">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center text-sm hover:text-red-600 transition">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:text-red-600 transition">Login</Link>
                <Link to="/register" className="bg-red-600 px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-2 text-white hover:text-red-600">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white px-4 py-3 border-t border-gray-700 space-y-2 animate-fade-in-down">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block hover:text-red-600">Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-red-600">About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block hover:text-red-600">Contact</Link>

          {isLoggedIn ? (
            <>
              <div className="pt-3 border-t border-gray-700">
                <div className="py-1">Hi, {user?.name}</div>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block hover:text-red-600">Admin Panel</Link>
                )}
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block hover:text-red-600">Dashboard</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left hover:text-red-600"
                >
                  <LogOut className="inline h-4 w-4 mr-1" /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block hover:text-red-600">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
