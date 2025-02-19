import React, { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../../store/userContext";

const Slider = ({ isOpen, onClose, children }) => {
  const sliderRef = useRef(null);
  const { setUser } = useContext(UserContext); // Access setUser from context
  const navigate = useNavigate();

  // Close slider when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        onClose(); // Call the onClose function to close the slider
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove token from session storage
    sessionStorage.removeItem("user"); // Remove user data from session storage
    setUser(null); // Clear user from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      ref={sliderRef}
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-teal-700 mb-6">Menu</h2>
        <button
          className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
        {children} {/* Render additional children if provided */}
      </div>
    </div>
  );
};

export default Slider;