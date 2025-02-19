import React, { useState } from "react";
import axios from "axios";
import updateFeatureApi from "../../../UpdateApi/updateapi";

const StageLinkUploader = ({
  stage,
  featureId,
  userId,
  userRole,
  feature,
  setRefreshKey,
  canMoveToStage,
  links = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [documentLink, setDocumentLink] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const featureStageMapping = {
    "Technical Design Document": "TECHNICAL_DESIGN",
    "Dev-Testing Document": "DEV_TESTING",
    "QA Testing Document": "QA_TESTING",
    "Pre- and Post-Deployment Documents": "PRE_POST_DEPLOYMENT",
    "Sanity Testing/Staging Results": "SANITY_TESTING_STAGING",
  };

  const openModal = () => {
    if (!roleCheck()) {
      alert("You are not authorized to add a document at this stage.");
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  const toggleAccordion = () => setIsExpanded(!isExpanded);

  const getDocumentType = (stage) => {
    const stageMapping = {
      "Technical Design Document": "TECHNICAL_DOC",
      "Dev-Testing Document": "DEV_TESTING_DOC",
      "QA Testing Document": "QA_DOC",
      "Pre- and Post-Deployment Documents": "PRE_POST_DOC",
      "Sanity Testing/Staging Results": "STAGING_DOC",
    };
    return stageMapping[stage] || "UNKNOWN_DOC";
  };

  const roleCheck = () => {
    const allowedRoles = {
      "Technical Design Document": ["ADMIN", "DEVELOPER", "EPIC_OWNER"],
      "Dev-Testing Document": ["ADMIN", "DEVELOPER", "EPIC_OWNER"],
      "QA Testing Document": ["ADMIN", "QA_ENGINEER", "EPIC_OWNER"],
      "Pre- and Post-Deployment Documents": [
        "ADMIN",
        "DEVELOPER",
        "PRODUCT_MANAGER",
      ],
      "Sanity Testing/Staging Results": [
        "ADMIN",
        "QA_ENGINEER",
        "EPIC_OWNER",
        "PRODUCT_MANAGER",
      ],
    };

    return allowedRoles[stage]?.includes(userRole);
  };

  const handleSave = () => {
    if (!documentLink.trim()) {
      alert("Document link cannot be empty!");
      return;
    }

    const token = sessionStorage.getItem("token");
    const documentType = getDocumentType(stage);

    const payload = {
      featureId,
      userId,
      documentType,
      documentLink,
    };

    console.log("Adding document:", payload);

    axios
      .post("http://localhost:8080/api/public/doc", payload, {
        headers: { Authorization: `${token}` },
      })
      .then(() => {
        alert("Document added successfully!");
        setShowModal(false);
        setDocumentLink("");
      })
      .catch((error) => console.error("Error adding document:", error));

    if (canMoveToStage(feature.stage, featureStageMapping[stage])) {
      feature.stage = featureStageMapping[stage];
    }
    updateFeatureApi(feature, userId).then(() => {
      //.then ensures that the feature is updated before the refresh key is set.
      setRefreshKey((prev) => prev + 1);
    });
  };

  return (
    <div className="border-b border-sky-200 py-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-slate-700">{stage}</span>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          onClick={openModal}
        >
          Add Link
        </button>
      </div>

      {links.length > 0 ? (
        <div>
          <div
            className="flex justify-between items-center cursor-pointer mt-3"
            onClick={toggleAccordion}
          >
            <span className="text-slate-600">View Documents</span>
            <span className="text-slate-600 transform transition-transform duration-200">
              {isExpanded ? "▲" : "▼"}
            </span>
          </div>
          {isExpanded && (
            <div className="mt-3 p-4 border border-sky-200 rounded-lg bg-sky-50">
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li
                    key={index}
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    <a
                      href={link.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline inline-block max-w-full truncate overflow-hidden"
                    >
                      {link.documentLink}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-500 mt-3">No documents available</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-slate-700 mb-4">
              Paste Link for {stage}
            </h2>
            <input
              type="text"
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 placeholder-slate-400"
              placeholder="Enter link here..."
              value={documentLink}
              onChange={(e) => setDocumentLink(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-3">
              <button
                className="bg-slate-400 px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                onClick={handleSave}
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

export default StageLinkUploader;
