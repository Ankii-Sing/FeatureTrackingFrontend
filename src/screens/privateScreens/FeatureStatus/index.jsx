import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import StageLinkUploader from "./component/HandleStage";
import { isAuthenticated } from "../../../utils/auth";

const FeatureStatus = () => {
  const [feature, setFeature] = useState(null);
  const [prReviewers, setPrReviewers] = useState([]);
  const featureId = sessionStorage.getItem("FeatureId");
  const user = sessionStorage.getItem("user");
  const userJson = JSON.parse(user);
  const userId = userJson.userId; 
  const navigate = useNavigate();

  console.log(" user is :" ,user);

  console.log("FeatureId and titile of current clicked feature ", userId);
 

  

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
  }, [featureId]);

  const handleApproval = (stage, decision) => {
    console.log(`Feature ${featureId} ${stage} ${decision}`);
    alert(`Feature ${featureId} ${stage} ${decision}`);
  };

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
        <span className="font-semibold">Feature Status: {feature?.status || "Pending"}</span>
      </div>

      {/* Developer */}
      <div className="text-gray-900 font-semibold mb-6">Assigned Developer: {feature?.assignedTo.username || "No Developer Assigned"}</div>


      {/* Feature Stages */}
      <div className="mt-6">
        {/* Stages with "Add Link" */}
        {[
          "Technical Design Document",
          "Dev-Testing Document",
        ].map((stage, index) => (
          <StageLinkUploader key={index} stage={stage} featureId={featureId} userId={userId} />
        ))}

        {/* PR Reviewer Addition */}
        <div className="flex justify-between items-center border-b py-2">
          <span>Add Pull Request</span>
          <button className="bg-green-600 text-white px-3 py-1 rounded-md" > Add + </button>
        </div>


        {/* PR Reviewed (Requires Special Handling) */}
        <StageLinkUploader stage="Pull Request Review" featureId={featureId} userId={userId} />


        {[
          "QA Testing Document",
          "Pre- and Post-Deployment Documents",
          "Sanity Testing/Staging Results",
        ].map((stage, index) => (
          <StageLinkUploader key={index} stage={stage} featureId={featureId} userId={userId} />
        ))}
        

        {/* Approve / Decline Buttons */}
        {["Product Go-Ahead", "Epic Owner Go-Ahead"].map((stage, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{stage}</span>
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
    </div>
  );
};

export default FeatureStatus;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FeatureStatus = () => {
//   const [feature, setFeature] = useState(null);
//   const featureId = sessionStorage.getItem("FeatureId");
//   const token = sessionStorage.getItem("token");
  
//   useEffect(() => {
//     if (!featureId) {
//       console.error("Feature ID not found in session storage");
//       return;
//     }
    
//     axios.get(`http://localhost:8080/api/public/feature/${featureId}`, {
//       headers: { Authorization: `${token}` },
//     })
//     .then((response) => setFeature(response.data))
//     .catch((error) => console.error("Error fetching feature:", error));
//   }, [featureId]);
  
//   if (!feature) return <p className="text-center text-gray-600">Loading...</p>;

//   return (
    // <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    //   {/* Header */}
    //   <div className="flex justify-between items-center border-b pb-3 mb-4">
    //     <h2 className="text-2xl font-bold">{feature?.title || "No Name"}</h2>
    //     <span className="text-gray-500 text-sm">Due Date: {feature.dueDate ? new Date(feature.dueDate).toLocaleDateString() : "N/A"}</span>
    //   </div>

    //   {/* Description */}
    //   <p className="text-gray-700 mb-4">{feature?.description || "No Description Available"}</p>

    //   {/* Posted by & Status */}
    //   <div className="flex justify-between text-sm text-gray-800 mb-6">
    //     <span>Posted by — {feature?.createdBy.username || "Unknown"}</span>
    //     <span className="font-semibold">Feature Status: {feature?.status || "Pending"}</span>
    //   </div>

    //   {/* Developer */}
    //   <div className="text-gray-900 font-semibold mb-6">Assigned Developer: {feature?.assignedTo.username || "No Developer Assigned"}</div>

//       {/* Feature Stages */}
//       <div>
//         {feature?.stages?.map((stage, index) => (
//           <div key={index} className="flex justify-between items-center py-2 border-b">
//             <span className="text-gray-900 font-medium">{stage.name}</span>
//             <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg shadow-md hover:bg-purple-700">
//               Add Link
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Back Button */}
    //   <div className="mt-6 text-center">
    //     <button className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-900">Go Home</button>
    //   </div>
//     </div>
//   );
// };

// export default FeatureStatus;