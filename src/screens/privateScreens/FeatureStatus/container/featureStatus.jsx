import React, { Component } from "react";
import { fetchPullRequests, addPullRequest } from "../utils/prService";
import { isAuthenticated } from "../../../../utils/auth";
// import { ApprovalControls } from "../component";
// import DocumentUploader from "../component";
import { useNavigate } from "react-router-dom";
import { fetchDocumentsByFeatureId } from "../utils/getAllDocs";
import updateFeatureApi from "../utils/updateapi";
// import { FeatureDetails, PrList } from "../component";
import { ApprovalControls, DocumentUploader, FeatureDetails, PrList } from "../component";


class FeatureStatusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feature: null,
      documentMap: new Map(),
      featureId: sessionStorage.getItem("FeatureId"),
      user: JSON.parse(sessionStorage.getItem("user")),
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      refreshKey: 0,
      prModalOpen: false,
      prLink: "",
      pullRequests: [],
    };
  }

  componentDidMount() {
    isAuthenticated();
    this.loadFeatureData();
  }

  loadFeatureData = () => {
    const { featureId } = this.state;
    fetchDocumentsByFeatureId(featureId).then((map) => this.setState({ documentMap: map }));
    fetchPullRequests(featureId).then((prs) => this.setState({ pullRequests: prs }));
  };

  handleAddPR = () => {
    const { prLink, featureId } = this.state;
    addPullRequest(featureId, prLink).then(() => {
      this.setState({ prModalOpen: false, prLink: "" });
      this.loadFeatureData();
    });
  };

  handleApproval = (stage, decision) => {
    const { feature, userId } = this.state;
    updateFeatureApi(feature, userId).then(() => this.loadFeatureData());
  };

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <FeatureDetails feature={this.state.feature} />
          <DocumentUploader documentMap={this.state.documentMap} />
          <PrList pullRequests={this.state.pullRequests} handleAddPR={this.handleAddPR} />
          <ApprovalControls feature={this.state.feature} handleApproval={this.handleApproval} />
        </div>
      </div>
    );
  }
}

// Wrapping with useNavigate
const FeatureStatusWithNavigation = (props) => {
  const navigate = useNavigate();
  return <FeatureStatusContainer {...props} navigate={navigate} />;
};

export default FeatureStatusWithNavigation;
