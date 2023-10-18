import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton } from "@clerk/clerk-react"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
            <Link to="/home">
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
              href="/upload"
              className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Services
            </a>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
