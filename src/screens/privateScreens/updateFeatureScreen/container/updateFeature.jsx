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
    this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData, featureId, userId } = this.state;
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

// Wrapping with useNavigate and useLocation
const UpdateFeatureWithNavigation = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return <UpdateFeatureContainer {...props} navigate={navigate} location={location} />;
};

export default UpdateFeatureWithNavigation;
