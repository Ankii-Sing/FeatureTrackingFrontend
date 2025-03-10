import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../utils/auth";
import StageLinkUploader from "./component/HandleStage";
import { updatePrStatus } from "./utils/prService";
import { showApproval } from "./utils/showApproval";
import { fetchDocumentsByFeatureId } from "./utils/getAllDocList";
import UpdateFeatureScreen from "../updateFeatureScreen";
import updateFeatureApi from "../UpdateApi/updateapi";


const FeatureStatus = () => {
  const [feature, setFeature] = useState(null);
  const [documentMap, setDocumentMap] = useState(new Map());
  const featureId = sessionStorage.getItem("FeatureId");
  const user = sessionStorage.getItem("user");
  const userJson = JSON.parse(user);
  const userId = userJson.userId;
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [prModalOpen, setPrModalOpen] = useState(false);
  const [prLink, setPrLink] = useState("");
  const [pullRequests, setPullRequests] = useState([]);

  const allowedRoles = ["ADMIN", "DEVELOPER", "EPIC_OWNER"];

  useEffect(() => {
    isAuthenticated();

    if (!featureId) {
      console.error("Feature ID not found in session storage");
      return;
    }

    const token = sessionStorage.getItem("token");

    // request to get the feature by id
    axios
      .get(`http://localhost:8080/api/public/feature/${featureId}`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => setFeature(response.data))
      .catch((error) => console.error("Error fetching feature:", error));

    fetchDocumentsByFeatureId(featureId)
      .then((map) => {
        setDocumentMap(map); // Save fetched document map
        console.log("Updated Document Map:", map);
      })
      .catch((error) => console.error("Error fetching documents:", error));

    fetchPullRequests(); // Fetch PRs for the feature
  }, [featureId, refreshKey]);

  const handleAddPR = () => {
    if (!prLink.trim()) {
      alert("PR link cannot be empty!");
      return;
    }

    const token = sessionStorage.getItem("token");
    const payload = {
      link: prLink,
    };
    console.log("Payload for adding PR:", payload);


    // Request to add PR
    axios
      .post(`http://localhost:8080/api/public/pullrequest/add/${featureId}`, payload, {
        headers: { Authorization: `${token}` },
      })
      .then(() => {
        alert("Pull Request added successfully!");
        setPrModalOpen(false);
        setPrLink("");
        fetchPullRequests(); // Refresh PR list
      })
      .catch((error) => console.error("Error adding PR:", error));
  };

  const fetchPullRequests = () => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`http://localhost:8080/api/public/pullrequest/${featureId}`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        const prData = JSON.parse(JSON.stringify(response.data)); // Ensure it's JSON
        
        const formattedPRs = prData && prData.map((pr) => ({
          pullRequestId: pr.pullrequest_id, // Store PR ID
          link: pr.link,
          prstatus: pr.prStatus, // Store PR link
        }));
        console.log("Fetched PR Data:", prData);

        setPullRequests(formattedPRs);
        console.log("Formatted PR Data:", formattedPRs);
      })
      .catch((error) => console.error("Error fetching PRs:", error));
  };

  const roleCheckForApproval = (stage) => {
    const allowedRoles = {
      "Product Go-Ahead": ["ADMIN", "PRODUCT_MANAGER"],
      "Epic Owner Go-Ahead": ["ADMIN", "EPIC_OWNER"],
    };

    return allowedRoles[stage]?.includes(userJson.role);
  };

  const handleApproval = (stage, decision) => {
    if (!roleCheckForApproval(stage)) {
      alert(`You are not authorized to change ${stage} status.`);
      return;
    }
    

    const token = sessionStorage.getItem("token");
    const isApproved = decision === "Approved";

    const stageMapping = {
      "Epic Owner Go-Ahead": "EPIC_OWNER_GO_AHEAD",
      "Product Go-Ahead": "PRODUCT_GO_AHEAD",
    };

    // callin updateFeatureApi after updating the feature.
    feature.stage = stageMapping[stage];
    if(stageMapping[stage] === "EPIC_OWNER_GO_AHEAD" && isApproved){
        feature.status = "COMPLETED";
    }
    console.log("Feature after updating stage:", feature);
    console.log("User ID:", userId);
    updateFeatureApi(feature, userId).then(() => {
        setRefreshKey((prevKey) => prevKey + 1); // Refresh feature data after update
      });
    // setFeature(feature); // this is to update the feature object in the state.

    const payload = {
      featureId: featureId,
      stage: stageMapping[stage],
      status: isApproved,
      userId: userId,
    };

    axios
      .post("http://localhost:8080/api/public/feature/approval", payload, {
        headers: { Authorization: `${token}` },
      })
      .then(() => {
        alert(`Feature ${featureId} ${stage} ${decision} successfully!`);
        setRefreshKey((prevKey) => prevKey + 1); // Refresh feature data
      })
      .catch((error) => {
        console.error("Error updating approval status:", error);
        alert("Failed to update approval status.");
      });
  };

  if (!feature) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-teal-700">{feature?.title || "No Name"}</h2>
          <span className="text-slate-500 text-sm">
            Due Date: {feature.dueDate ? new Date(feature.dueDate).toLocaleDateString() : "N/A"}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-700 mb-6">{feature?.description || "No Description Available"}</p>

        {/* Posted by & Status */}
        <div className="flex justify-between text-sm text-slate-800 mb-6">
          <span>Posted by — {feature?.createdBy.username || "Unknown"}</span>
          <span className="font-semibold">Feature Stage: {feature?.stage || "Pending"}</span>
        </div>

        {/* Developer */}
        <div className="text-slate-900 font-semibold mb-6">
          Assigned Developer: {feature?.assignedTo.username || "No Developer Assigned"}
        </div>

        {/* Feature Stages */}
        <div className="space-y-6">
          {/* Stages with "Add Link" */}
          {[
            { name: "Technical Design Document", key: "TECHNICAL_DOC" },
            { name: "Dev-Testing Document", key: "DEV_TESTING_DOC" },
          ].map((stage, index) => (
            <StageLinkUploader
              key={index}
              stage={stage.name}
              userRole={userJson.role}
              featureId={featureId}
              userId={userId}
              feature = {feature}
              setRefreshKey = {setRefreshKey}
              links={documentMap.get(stage.key) || []}
            />
          ))}

          {/* PR Reviewer Addition */}
          <div className="flex justify-between items-center border-b border-sky-200 py-4">
            <span className=" font-semibold text-slate-700">Add Pull Request</span>
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              onClick={() => {
                if (user && allowedRoles.includes(userJson.role)) {
                  setPrModalOpen(true);
                } else {
                  alert(`You are not authorized to add Pull Requests`);
                }
              }}
            >
              Add +
            </button>
          </div>

          {/* Display Added PRs */}
          {pullRequests.length > 0 && (
            <ul className="mt-4 space-y-3">
              {pullRequests.map((pr, index) => (
                <li key={index} className="flex items-center justify-between bg-sky-50 p-3 rounded-lg">
                  <a
                    href={pr.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    PR Link
                  </a>
                  <div className="flex items-center space-x-3">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
                      onClick={() => updatePrStatus(pr.pullRequestId, true, fetchPullRequests, userJson.role)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                      onClick={() => updatePrStatus(pr.pullRequestId, false, fetchPullRequests, userJson.role)}
                    >
                      Decline
                    </button>
                    <span
                      className={`text-sm ${
                        pr.prstatus === true
                          ? "text-green-600"
                          : pr.prstatus === false
                          ? "text-red-600"
                          : "text-slate-500"
                      }`}
                    >
                      {pr.prstatus === true ? "Approved" : pr.prstatus === false ? "Declined" : "Pending"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Additional Stages */}
          {[
            { name: "QA Testing Document", key: "QA_DOC" },
            { name: "Pre- and Post-Deployment Documents", key: "PRE_POST_DOC" },
            { name: "Sanity Testing/Staging Results", key: "STAGING_DOC" },
          ].map((stage, index) => (
            <StageLinkUploader
              key={index}
              stage={stage.name}
              userRole={userJson.role}
              featureId={featureId}
              userId={userId}
              feature = {feature}
              setRefreshKey = {setRefreshKey}
              links={documentMap.get(stage.key) || []}
            />
          ))}

          {/* Approval Stages */}
          {["Product Go-Ahead", "Epic Owner Go-Ahead"].map((stage, index) => (
            <div key={index} className="flex justify-between items-center border-b border-sky-200 py-4">
              <span className=" font-semibold text-slate-700">{stage}</span>
              <span className="text-slate-500">Status: {showApproval(stage, feature)}</span>
              <div className="flex space-x-3">
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  onClick={() => handleApproval(stage, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() => handleApproval(stage, "Declined")}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-slate-700 text-white rounded-lg shadow-md hover:bg-slate-900 transition-colors"
            onClick={() => navigate("/Feature")}
          >
            Go Home
          </button>
          <button
            className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors"
            onClick={() => navigate("/UpdateFeatureScreen", { state: { feature, featureId, userId } })}
          >
            Update Feature
          </button>
        </div>
      </div>

      {/* PR Modal */}
      {prModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Paste PR Link</h2>
            <input
              type="text"
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 mb-4"
              placeholder="Enter PR link here..."
              value={prLink}
              onChange={(e) => setPrLink(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-slate-400 px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors"
                onClick={() => setPrModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                onClick={handleAddPR}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureStatus;

