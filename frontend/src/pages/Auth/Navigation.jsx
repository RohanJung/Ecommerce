import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="w-20 bg-black h-screen flex flex-col justify-between overflow-hidden fixed z-19">
      <div className="flex flex-col">
        <div>
          <Link to="/" className="text-white">
            Home
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            Shop
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            Cart
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            Favourites
          </Link>
        </div>
      </div>
      d{" "}
      <nav className="w-64 bg-gray-800 text-white h-screen">
        {" "}
        {/* Sidebar styles */}
        <ul className="space-y-2 p-4">
          <li>
            <Link to="/login" className="block py-2 hover:bg-gray-700 rounded">
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="block py-2 hover:bg-gray-700 rounded"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
