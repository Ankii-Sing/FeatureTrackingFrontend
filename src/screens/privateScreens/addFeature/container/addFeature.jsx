import React, { Component } from "react";
import { fetchUsers, addFeature } from "../api";
import UserContext from "../../../../store/userContext";
import AddFeatureForm from "../components/addFeatureForm";
import { useNavigate } from "react-router-dom";

class AddFeatureContainer extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formData: {
        title: "",
        description: "",
        duedate: "",
        assignedTo: "",
        prodManager: "",
        qaEngineer: "",
        epicOwner: "",
        created_by: "",
      },
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (!user || !["ADMIN", "PRODUCT_MANAGER", "EPIC_OWNER"].includes(user.role)) {
      alert("You are not authorized to add a feature.");
      this.props.navigate("/Feature");
      return;
    }
    if (user?.userId) {
      this.setState((prevState) => ({
        formData: { ...prevState.formData, created_by: String(user.userId) },
      }));
    }
    this.loadUsers();
  }

  loadUsers = async () => {
    const users = await fetchUsers();
    if (users) this.setState({ users });
  };

  handleChange = (e) => {
    this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const success = await addFeature(formData);
    if (success) this.props.navigate("/Feature");
  };

  render() {
    return (
      <AddFeatureForm
        users={this.state.users}
        formData={this.state.formData}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const AddFeatureWithNavigation = (props) => {
  const navigate = useNavigate();
  return <AddFeatureContainer {...props} navigate={navigate} />;
};

export default AddFeatureWithNavigation;
