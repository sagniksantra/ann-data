import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
            <Link to="/">
                agrosync
            </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a
              href="/about"
              className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Services
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
