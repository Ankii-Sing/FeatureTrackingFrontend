import React from "react";

const LoginForm = ({ email, password, errorMessage, handleChange, handleLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-teal-50">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-96 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          Welcome to Feature Portal
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 placeholder-slate-400"
              value={email}
              autoComplete="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 placeholder-slate-400"
              value={password}
              autoComplete="current-password"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-300 shadow-sm"
          >
            Sign In
          </button>
          <div className="text-center text-slate-600">
            Don't have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer hover:underline"
              onClick={() => window.location.href = "/register"}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
