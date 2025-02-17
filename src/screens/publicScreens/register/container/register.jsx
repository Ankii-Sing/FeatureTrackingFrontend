import { useState } from "react";
import { registerUser } from "../../../service/authservices";
import { useNavigate } from "react-router-dom";
import RegisterComponent from "../../../components/Register";
import { userRoles } from "../../../constants/userRoles";

const RegisterContainer = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

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
    <RegisterComponent
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      userRole={userRole}
      setUserRole={setUserRole}
      handleRegister={handleRegister}
      userRoles={userRoles}
    />
  );
};

export default RegisterContainer;