import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../utils/auth";
import StageLinkUploader from "./component/HandleStage";
import { updatePrStatus } from "./utils/prService";
// import StageLinkUploader from   "./src/screens/privateScreens/featureStatus/component/HandleStage";
import { showApproval } from "./utils/showApproval";
import { fetchDocumentsByFeatureId } from "./utils/getAllDocList";
import UpdateFeatureScreen from "../updateFeatureScreen";


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


  console.log("feature is :", feature);

  useEffect(() => {
    isAuthenticated();

    if (!featureId) {
      console.error("Feature ID not found in session storage");
      return;
    }

    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:8080/api/public/feature/${featureId}`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => setFeature(response.data))
      .catch((error) => console.error("Error fetching feature:", error));

       
    //   Fetch feature documents and store in map
    // fetchDocumentsByFeatureId(featureId).then((map) => {
    //     setDocumentMap(map);
    //     console.log("Document Map:", map);
    //     console.log("document links :" ,map.get["TECHNICAL_DOC"]);

    //   });

      fetchPullRequests(); // Fetch PRs for the feature
      
    }, [featureId, refreshKey]);

    // console.log("Document Map:", documentMap);
    console.log("document links :" ,documentMap["TECHNICAL_DOC"]);

    const handleAddPR = () => {
        if (!prLink.trim()) {
          alert("PR link cannot be empty!");
          return;
        }
    
        const token = sessionStorage.getItem("token");
        const payload = {
            link: prLink
        };
        console.log("Payload for adding PR:", payload);
    
        axios
        .post(`http://localhost:8080/api/public/pullrequest/add/${featureId}`,payload, {
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

// calling fetchPullRequests after saving the pr link on the model.
    const fetchPullRequests = () => {
        const token = sessionStorage.getItem("token");

        axios
        .get(`http://localhost:8080/api/public/pullrequest/${featureId}`, {
            headers: { Authorization: `${token}` },
        })
        
        .then((response) => {
            const prData = JSON.parse(JSON.stringify(response.data)); // Ensure it's JSON
            const formattedPRs = prData.map(pr => ({
                pullRequestId: pr.pullrequest_id, // Store PR ID
                link: pr.link,
                prstatus:pr.prStatus, // Store PR link
            }));
            console.log("Fetched PR Data:", prData);
    
            setPullRequests(formattedPRs);
            console.log("Formatted PR Data:", formattedPRs);
        })
        .catch((error) => console.error("Error fetching PRs:", error));
    };

    // console.log("Pull Requests:", pullRequests);



    const handleApproval = (stage, decision) => {
        const token = sessionStorage.getItem("token");
        const isApproved = decision === "Approved";

        const stageMapping = {
            "Epic Owner Go-Ahead": "EPIC_OWNER_GO_AHEAD",
            "Product Go-Ahead": "PRODUCT_GO_AHEAD",
          };
    
        const payload = {
          featureId: featureId,
          stage: stageMapping[stage],
          status: isApproved, 
          userId: userId,
        };

        // console.log("Payload for updating approval status:", payload);
    
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

    //   console.log("calling showApproval function", showApproval("Product Go-Ahead",feature));

  if (!feature) return <p>Loading...</p>;

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-2xl font-bold">{feature?.title || "No Name"}</h2>
        <span className="text-gray-500 text-sm">Due Date: {feature.dueDate ? new Date(feature.dueDate).toLocaleDateString() : "N/A"}</span>
      </div>

       {/* Description */}
      <p className="text-gray-700 mb-4">{feature?.description || "No Description Available"}</p>

      {/* Posted by & Status */}
      <div className="flex justify-between text-sm text-gray-800 mb-6">
        <span>Posted by — {feature?.createdBy.username || "Unknown"}</span>
        <span className="font-semibold">Feature Stage: {feature?.stage || "Pending"}</span>
      </div>

      {/* Developer */}
      <div className="text-gray-900 font-semibold mb-6">Assigned Developer: {feature?.assignedTo.username || "No Developer Assigned"}</div>


      {/* Feature Stages */}
      <div className="mt-6">
        {/* Stages with "Add Link" */}
        {[
        //   { name: "Technical Design Document", key: "TECHNICAL_DOC" },
        //   { name: "Dev-Testing Document", key: "DEV_TESTING_DOC" },
        "Technical Design Document",
        "Dev-Testing Document",
        ].map((stage, index) => (
          <StageLinkUploader key={index} stage={stage} featureId={featureId} userId={userId} 
        //   links = {documentMap.get[stage.key]} 
          />
        ))}



        {/* PR Reviewer Addition */}
        <div className="flex justify-between items-center border-b py-2">
          <span>Add Pull Request</span>
          <button className="bg-green-600 text-white px-3 py-1 rounded-md" onClick={() => setPrModalOpen(true)}>
            Add +
          </button>
        </div>
        
        {/* Display Added PRs */}
        
        {pullRequests.length > 0 && (
          <ul className="mt-2 mb-4 list-disc pl-5 ">
            {pullRequests.map((pr, index) => (
              <li key={index}>
                <a href={pr.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                   link
                   {/* {pr.link} */}
                </a>
                <button className="bg-green-600 text-white px-1 py-1 rounded-md ml-4" 
                onClick={() => updatePrStatus(pr.pullRequestId, true, fetchPullRequests)} // Use stored PR ID
                >Approve</button>
                <button className="bg-red-600 text-white px-1 py-1 rounded-md ml-4 " 
                onClick={() => updatePrStatus(pr.pullRequestId, false, fetchPullRequests)} // Use stored PR ID
                >Decline</button>

                <a className="ml-6 
                ${pr.prstatus === true ? 'text-green-600' : pr.prstatus === false ? 'text-red-600' : 'text-gray-400'}`} ">
                    status: {pr.prstatus === true ? "Approved" : pr.prstatus === false ? "Declined" : "Pending"}</a>
                <div className="mt-2"> </div>
                
              </li>
              
            ))}
          </ul>
        
        )}


        {/* PR Reviewed (Requires Special Handling) */}
        {/* <StageLinkUploader stage="Pull Request Review" featureId={featureId} userId={userId} /> */}


        {[
          "QA Testing Document",
          "Pre- and Post-Deployment Documents",
          "Sanity Testing/Staging Results",
        ].map((stage, index) => (
          <StageLinkUploader key={index} stage={stage} featureId={featureId} userId={userId} />
        ))}
        
     

        {["Product Go-Ahead", "Epic Owner Go-Ahead"].map((stage, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{stage}</span>
            <span> status: {showApproval(stage,feature )  } </span>
                {/* {feature.prodGoAheadStatus === true ? "Approved" : feature.prodGoAheadStatus === false ? "Declined" : "Pending"}</span> */}
            <div>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
                onClick={() => handleApproval(stage, "Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-md"
                onClick={() => handleApproval(stage, "Declined")}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-900" 
        onClick={()=> navigate("/Feature")}>Go Home</button>
      </div>

      {/* <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-900" 
         onClick={() => navigate("/UpdateFeatureScreen", { state: { feature, featureId} })}>Update Feature</button>
      </div> */}

       {/* PR Modal */}
       {prModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Paste PR Link</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Enter PR link here..."
              value={prLink}
              onChange={(e) => setPrLink(e.target.value)}
            />
            <div className="flex justify-end">
              <button className="bg-gray-400 px-4 py-2 mr-2 rounded" onClick={() => setPrModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddPR}>
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
