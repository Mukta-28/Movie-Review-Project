import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Socials */}
          <div>
            <div className="flex items-center mb-4 text-red-600">
              <Film className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold tracking-wide">CineReview</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Dive into honest reviews and ratings by real movie lovers. Discover, rate, and share!
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-300 hover:text-red-600 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-600 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-600 transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-600 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-600 transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-red-600 transition">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-red-600 transition">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-red-600 transition">Register</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <address className="not-italic text-gray-400 text-sm leading-relaxed">
              <p>101 Film City Road</p>
              <p>Goregaon East, Mumbai 400065</p>
              <p className="mt-1 italic text-gray-500">Near Bollywood Dreams Studio</p>
              <p>Maharashtra </p>
               <p> India</p>
              <p className="mt-2">Email: info@cinereview.com</p>
             <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CineReview. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 sm:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-600" /> by CineReview
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
