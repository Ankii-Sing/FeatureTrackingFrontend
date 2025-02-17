import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../component";
import { registerUser } from "../../../../service/authservices";

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      userRole: "",
      errorMessage: "",
    };

    this.userTypes = [
      "ADMIN",
      "DEVELOPER",
      "PRODUCT_MANAGER",
      "QA_ENGINEER",
      "EPIC_OWNER",
      "REGULAR_USER",
    ];
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, userRole } = this.state;
    const navigate = this.props.navigate;

    try {
      await registerUser({ username, email, password, userRole });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      this.setState({
        errorMessage: error.response?.data?.message || "Registration failed",
      });
    }
  };

  render() {
    return (
      <RegisterForm
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        userRole={this.state.userRole}
        errorMessage={this.state.errorMessage}
        userTypes={this.userTypes}
        handleChange={this.handleChange}
        handleRegister={this.handleRegister}
      />
    );
  }
}

// Wrapping with `useNavigate` inside a functional component
const RegisterContainerWithNavigation = (props) => {
  const navigate = useNavigate();
  return <RegisterContainer {...props} navigate={navigate} />;
};

export default RegisterContainerWithNavigation;
