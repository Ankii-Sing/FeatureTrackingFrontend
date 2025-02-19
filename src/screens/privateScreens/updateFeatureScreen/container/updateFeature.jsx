import React, { Component } from "react";
import { fetchUsers, updateFeature } from "../API/updateFeatureApi.jsx";
import UserContext from "../../../../store/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import UpdateFeatureForm from "../component/updateFeatureForm.jsx";

class UpdateFeatureContainer extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    const { feature } = props.location.state;
    this.state = {
      users: [],
      featureId: feature.featureId,
      userId: props.location.state.userId,
      formData: {
        title: feature.title || "",
        description: feature.description || "",
        dueDate: feature.dueDate || "",
        stage: feature.stage || "",
        status: feature.status || "",
        assignedTo: feature.assignedTo || "",
        prodManager: feature.prodManager || "",
        qaEngineer: feature.qaEngineer || "",
        epicOwner: feature.epicOwner || "",
      },
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    const users = await fetchUsers();
    if (users) this.setState({ users });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

   
    if (name === "title" && value.length > 255) {
      alert("Feature Title cannot exceed 255 characters.");
      return;
    }

  
    if (name === "description" && value.length > 512) {
      alert("Feature Description cannot exceed 512 characters.");
      return;
    }


    if (name === "dueDate") {
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
    const { formData, featureId, userId } = this.state;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.dueDate);

    if (selectedDate < today) {
      alert("Due date cannot be in the past. Please select a future date.");
      return;
    }

    if (formData.title.length > 255) {
      alert("Feature Title cannot exceed 255 characters.");
      return;
    }

    if (formData.description.length > 512) {
      alert("Feature Description cannot exceed 512 characters.");
      return;
    }

    const success = await updateFeature(featureId, userId, formData);
    if (success) this.props.navigate("/Feature");
  };

  render() {
    return (
      <UpdateFeatureForm
        users={this.state.users}
        formData={this.state.formData}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const UpdateFeatureWithNavigation = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return <UpdateFeatureContainer {...props} navigate={navigate} location={location} />;
};

export default UpdateFeatureWithNavigation;
