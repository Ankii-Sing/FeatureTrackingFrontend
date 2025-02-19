import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 flex flex-col">
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-teal-700">FeatureFlow </span>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-sky-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Manage Features. <span className="text-teal-700">Track Progress.</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4">
            A structured platform for managing feature development, tracking approvals, and maintaining workflow transparency.
          </p>
        </div>
        <div className="hidden md:block">
          <img
            src="src/assets/wlcome_bg.svg"
            alt="Feature Tracking"
            className="max-w-md"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">Core Functionalities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Feature Tracking", desc: "Monitor feature progress in real-time with status updates." },
            { title: "Role-Based Access", desc: "Secure access with roles for developers, managers, and owners." },
            { title: "Approval Workflow", desc: "Seamless approval process for managers and epic owners." },
            { title: "PR & Docs Management", desc: "Track pull requests and manage technical documents easily." }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <span className="bg-teal-500 text-white w-10 h-10 flex items-center justify-center rounded-lg text-lg font-semibold">
                ✔
              </span>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
