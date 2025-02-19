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
    const { name, value } = e.target;


    if (name === "title" && value.length > 255) {
      alert("Feature Name cannot exceed 255 characters.");
      return;
    }

    if (name === "description" && value.length > 512) {
      alert("Feature Description cannot exceed 512 characters.");
      return;
    }

    if (name === "duedate") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);

      if (selectedDate < today) {
        alert("Due date cannot be in the past. Please select a future date.");
        return;
      }
    }

    this.setState({ formData: { ...this.state.formData, [name]: value } });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData } = this.state;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.duedate);

    if (selectedDate < today) {
      alert("Due date cannot be in the past. Please select a future date.");
      return;
    }

    if (formData.title.length > 255) {
      alert("Feature Name cannot exceed 255 characters.");
      return;
    }

    if (formData.description.length > 512) {
      alert("Feature Description cannot exceed 512 characters.");
      return;
    }

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
