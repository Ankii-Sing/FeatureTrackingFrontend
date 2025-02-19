import React from "react";
import StageLinkUploader from "./HandleStage";
import { showApproval } from "../container/showApproval";

const FeatureForm = ({
  feature,
  documentMap,
  pullRequests,
  prModalOpen,
  setPrModalOpen,
  prLink,
  setPrLink,
  handleApproval,
  updatePrStatus,
  userJson,
  featureId,
  userId,
  setRefreshKey,
}) => {
  if (!feature) return <p>Loading feature details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-teal-700">
            {feature?.title || "No Name"}
          </h2>
          <span className="text-slate-500 text-sm">
            Due Date:{" "}
            {feature.dueDate
              ? new Date(feature.dueDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        {/* Feature Details */}
        <p className="text-slate-700 mb-6">
          {feature?.description || "No Description Available"}
        </p>

        {/* Posted By */}
        <div className="flex justify-between text-sm text-slate-800 mb-6">
          <span>Posted by — {feature?.createdBy.username || "Unknown"}</span>
          <div className="flex flex-col text-right">
            <span className="font-semibold text-gray-600">
              Stage: {feature?.stage || "Pending"}
            </span>
            <span className="font-semibold text-gray-600">
              Status: {feature?.status || "Pending"}
            </span>
          </div>
        </div>

        {/* Document Upload Stages */}
        {/* <div className="space-y-6">
          {[
            { name: "Technical Design Document", key: "TECHNICAL_DOC" },
            { name: "Dev-Testing Document", key: "DEV_TESTING_DOC" },
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
              feature={feature}
              setRefreshKey={setRefreshKey}
              links={documentMap.get(stage.key) || []}
            />
          ))}
        </div> */}

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
    feature={feature}
    setRefreshKey={setRefreshKey}
    canMoveToStage={canMoveToStage}
    links={documentMap.has(stage.key) ? documentMap.get(stage.key) : []} // ✅ FIX HERE
  />
))}

        <div className="flex justify-between items-center border-b border-sky-200 py-4">
          <span className=" font-semibold text-slate-700">
            Add Pull Request
          </span>
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setPrModalOpen(true)}
          >
            Add +
          </button>
        </div>

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
                  onClick={() => handleAddPR(prLink)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

{pullRequests.length > 0 && (
  <ul className="mt-4 space-y-3">
    {pullRequests.map((pr, index) => (
      <li key={index} className="flex items-center justify-between bg-sky-50 p-3 rounded-lg">
        <a href={pr.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          PR Link
        </a>
        <div className="flex items-center space-x-3">
          <button
            className={`px-3 py-1 rounded-md transition-colors ${
              pr.prstatus === true ? "bg-gray-400 text-white cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
            onClick={() => updatePrStatus(pr.pullRequestId, true, fetchPullRequests, userJson.role)}
            disabled={pr.prstatus === true}
          >
            Approve
          </button>

          <button
            className={`px-3 py-1 rounded-md transition-colors ${
              pr.prstatus === false ? "bg-gray-400 text-white cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"
            }`}
            onClick={() => updatePrStatus(pr.pullRequestId, false, fetchPullRequests, userJson.role)}
            disabled={pr.prstatus === false}
          >
            Decline
          </button>

          <span className={`text-sm ${pr.prstatus === true ? "text-green-600" : pr.prstatus === false ? "text-red-600" : "text-slate-500"}`}>
            {pr.prstatus === true ? "Approved" : pr.prstatus === false ? "Declined" : "Pending"}
          </span>
        </div>
      </li>
    ))}
  </ul>
)}


        {/* Approval Buttons */}
        {["Product Go-Ahead", "Epic Owner Go-Ahead"].map((stage, index) => (
  <div key={index} className="flex justify-between items-center border-b border-sky-200 py-4">
    <span className="font-semibold text-slate-700">{stage}</span>
    <span className="text-slate-500">Status: {showApproval(stage, feature)}</span>
    <div className="flex space-x-3">
      <button
        className={`px-4 py-2 rounded-lg transition-colors ${
          showApproval(stage, feature) === "Approved" ? "cursor-not-allowed bg-gray-400" : "bg-teal-600 text-white hover:bg-teal-700"
        }`}
        onClick={() => handleApproval(stage, "Approved")}
        disabled={showApproval(stage, feature) === "Approved"}
      >
        Approve
      </button>
      <button
        className={`px-4 py-2 rounded-lg transition-colors ${
          showApproval(stage, feature) === "Declined" ? "cursor-not-allowed bg-gray-400" : "bg-red-600 text-white hover:bg-red-700"
        }`}
        onClick={() => handleApproval(stage, "Declined")}
        disabled={showApproval(stage, feature) === "Declined"}
      >
        Decline
      </button>
    </div>
  </div>
))}


        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-slate-700 text-white rounded-lg shadow-md hover:bg-slate-900 transition-colors"
            onClick={() => navigate("/Feature")}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureForm;
