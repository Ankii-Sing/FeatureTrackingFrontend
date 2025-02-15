import React, { useState, useContext } from "react";
import { loginUser } from "../../../service/authservices";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/userContext";
import Navbar from "../../../shared/navBar";

const Login = () => {
  <Navbar/>
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      setUser(response.user);
      alert("Login successful!");
      navigate("/Feature");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-teal-50">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-96 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          Welcome to Feature Portal
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 focus:ring-1 
                       focus:ring-teal-400 placeholder-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border-2 border-sky-200 rounded-lg 
                       focus:outline-none focus:border-teal-400 focus:ring-1 
                       focus:ring-teal-400 placeholder-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-lg 
                     font-semibold hover:bg-teal-700 transition-colors 
                     duration-300 shadow-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState, useContext } from "react";
// import { loginUser} from "../../../service/authservices";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../../../store/userContext";


// const Login = () => {
//   const { setUser } = useContext(UserContext); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginUser({ email, password });
//       setUser(response.user); 
//       alert("Login successful!");
//       navigate("/Feature"); 
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-6 bg-white rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 border rounded mb-2"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 border rounded mb-2"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;