import { useState } from "react";
import { registerUser } from "../../../service/authservices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const userTypes = [
    "ADMIN",
    "DEVELOPER",
    "PRODUCT_MANAGER",
    "QA_ENGINEER",
    "EPIC_OWNER",
    "REGULAR_USER",
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password, userRole });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-teal-50">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username Field */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 placeholder-slate-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 placeholder-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 placeholder-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* User Role Select */}
          <div>
            <select
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 text-slate-700"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default Register;

