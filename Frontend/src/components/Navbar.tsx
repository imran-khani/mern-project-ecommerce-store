import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
        <li><Link to="/profile" className="text-white hover:text-gray-300">Profile</Link></li>
        <li><Link to="/cart" className="text-white hover:text-gray-300">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
