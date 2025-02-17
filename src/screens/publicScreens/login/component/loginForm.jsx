// Container: LoginContainer.js
import { useState, useContext } from "react";
import { loginUser } from "../../../service/authservices";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../store/userContext";
import LoginComponent from "../../components/auth/LoginComponent";

const LoginContainer = () => {
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
    <LoginComponent 
      email={email} 
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword} 
      handleLogin={handleLogin} 
      navigate={navigate} 
    />
  );
};

export default LoginContainer;
