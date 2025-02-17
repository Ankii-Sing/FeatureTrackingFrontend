import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../component/loginForm";
import { loginUser } from "../../../../service/authservices";
import UserContext from "../../../../store/userContext";

class LoginContainer extends Component {
  static contextType = UserContext; // Accessing context inside class component

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async (e, setUser) => {
    e.preventDefault();
    const { email, password } = this.state;
    const navigate = this.props.navigate;
  
    try {
      const response = await loginUser({ email, password });
  
      if (response.user) {
        setUser(response.user); // Update the UserContext with logged-in user
        alert("Login successful!");
        navigate("/Feature");
      } else {
        alert("Login failed. No user data returned.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };
  

  render() {
    return (
      <UserContext.Consumer>
        {({ setUser }) => (
          <LoginForm
            email={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
            handleLogin={(e) => this.handleLogin(e, setUser)} // Pass setUser to handleLogin
          />
        )}
      </UserContext.Consumer>
    );
  }
}

// Wrapping with `useNavigate` inside a functional component
const LoginContainerWithNavigation = (props) => {
  const navigate = useNavigate();
  return <LoginContainer {...props} navigate={navigate} />;
};

export default LoginContainerWithNavigation;
