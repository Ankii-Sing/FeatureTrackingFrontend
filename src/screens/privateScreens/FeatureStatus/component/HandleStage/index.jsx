import React, { useState } from "react";
import axios from "axios";

const StageLinkUploader = ({ stage, featureId, userId 
    // ,links
}) => {
  const [showModal, setShowModal] = useState(false);
  const [documentLink, setDocumentLink] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
//   console.log("links",links);

  // Map stage names to DocumentType enum values
  const getDocumentType = (stage) => {
    const stageMapping = {
      "Technical Design Document": "TECHNICAL_DOC",
      "Dev-Testing Document": "DEV_TESTING_DOC",
      "QA Testing Document": "QA_DOC",
      "Pre- and Post-Deployment Documents": "PRE_POST_DOC",
      "Sanity Testing/Staging Results": "STAGING_DOC",
    };
    return stageMapping[stage] || "UNKNOWN_DOC"; // Default fallback
  };

  const handleSave = () => {


    if (!documentLink.trim()) {
        alert("Document link cannot be empty!"); // Show an alert or use better UI feedback
        return;
    }


    const token = sessionStorage.getItem("token");
    const documentType = getDocumentType(stage); // Get correct type

    const payload = {
      featureId,
      userId, // Fix: Correct structure as expected by DTO
      documentType,
      documentLink,
    };

    console.log("Adding document:", payload);

    axios.post("http://localhost:8080/api/public/doc", payload, {
      headers: { Authorization: `${token}` },
    })
    .then(() => {
      alert("Document added successfully!");
      setShowModal(false);
      setDocumentLink("");
    })
    .catch((error) => console.error("Error adding document:", error));
  };

    // const showlinks = () => {
    //     return links.map((link) => (
    //         <a href={link.documentLink} target="_blank" rel="noreferrer" className="text-blue-600 underline" key={link.documentId}>
    //             {link.documentLink}
    //         </a>
    //     ));
    // };

  return (
    <div className="flex justify-between items-center border-b py-2">
      <span>{stage}</span> 
      {/* <span> {showlinks}</span> */}

      {/* {links.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {links.map((link, index) => (
            <li key={index} className="text-blue-600 underline">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No documents available</p>
      )} */}

      <button className="bg-purple-600 text-white px-3 py-1 rounded-md" onClick={openModal}>
        Add Link
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-200 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Paste Link for {stage}</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Enter link here..."
              value={documentLink}
              onChange={(e) => setDocumentLink(e.target.value)}
            />
            <div className="flex justify-end">
              <button className="bg-gray-400 px-4 py-2 mr-2 rounded" onClick={closeModal}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageLinkUploader;