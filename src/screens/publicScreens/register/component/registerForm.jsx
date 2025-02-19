import React from "react";

const RegisterForm = ({
  username,
  email,
  password,
  userRole,
  errorMessage,
  userTypes,
  handleChange,
  handleRegister,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-teal-50">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          {/* Username Field */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 placeholder-slate-400"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 placeholder-slate-400"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 placeholder-slate-400"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          {/* User Role Select */}
          <div>
            <select
              name="userRole"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 text-slate-700"
              value={userRole}
              onChange={handleChange}
              required
            >
              <option value="">Select User Type</option>
              {userTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-lg 
                     font-semibold hover:bg-teal-700 transition-colors"
          >
            Create Account
          </button>

          {/* Link to Login Page */}
          <div className="text-center text-slate-600">
            Already have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer hover:underline"
              onClick={() => window.location.href = "/login"}
            >
              Log In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
