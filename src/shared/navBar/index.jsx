import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-teal-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Home</Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-white mx-4">Profile</Link>
              <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-4">Login</Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;