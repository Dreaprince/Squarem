// components/Navbar.tsx
import React from 'react';
import { FaSearch, FaBell, FaCog, FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 w-[1280px] h-[72px] px-8 flex items-center justify-between shadow-md">
      <div className="pl-9 text-white text-lg" style={{ width: '147px', height: '24px' }}>MyApp</div>
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center">
          <FaSearch />
        </button>
        <button className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center">
          <FaBell />
        </button>
        <button className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center">
          <FaCog />
        </button>
        <div className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center ml-2">
          <FaUserCircle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

