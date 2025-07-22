import { CameraIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6">
      <div className="flex justify-around items-center">
        <Link to="/home" className="flex flex-col items-center text-green-600">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/scanner"
          className="flex flex-col items-center text-gray-500"
        >
          <CameraIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Scanner</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-500"
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
