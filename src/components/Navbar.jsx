import React from 'react';
import { Shield, Menu } from 'lucide-react';

function Navbar({ onLogout }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Mental Health Check-in
            </span>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;