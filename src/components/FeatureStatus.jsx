// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

const FeatureStatus = ({feature}) => {
// //   const { featureId } = useParams(); 
//   const [feature, setFeature] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (!token) {
//       setError("Unauthorized: No token found.");
//       return;
    // }
    
//     axios
//       .get(`http://localhost:8080/api/public/feature/5`, {
//         headers: { Authorization: `${token}` },
//       })
//       .then((response) => setFeature(response.data))
//       .catch((error) => {
//         console.error("Error fetching feature:", error);
//         setError("Failed to fetch feature. Please try again.");
//       });
//   }, [featureId]);

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!feature) return <p>Loading...</p>;

    // console.log("feature data in feature status page:", feature);
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold">{feature.title}</h2>
//       <p className="text-gray-600">{feature.description}</p>
//       <p className="text-sm text-gray-500">Posted by: {feature.createdBy}</p>
//       <p className="text-sm text-gray-500">Due Date: {feature.dueDate}</p>
      
//       <div className="mt-6 border-l-2 border-purple-500 pl-4">
//         {["Technical Design Document", "Dev-Testing Document", "Add Reviewers", "PRs Reviewed", "QA Testing Document", "Pre- and Post-Deployment Documents", "Sanity Testing/Staging Results", "Product Go-Ahead", "Epic Owner Go-Ahead"].map((stage, index) => (
//           <div key={index} className="mb-4 flex justify-between items-center">
//             <p className="font-medium">• {stage}</p>
//             <div>
//               {index < 7 ? (
//                 <button className="bg-purple-500 text-white px-3 py-1 rounded">Add Link</button>
//               ) : (
//                 <>
//                   <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Approve</button>
//                   <button className="bg-red-500 text-white px-3 py-1 rounded">Decline</button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="mt-6 bg-purple-600 text-white px-4 py-2 rounded">Go Home</button>
//     </div>
//   );
};

export default FeatureStatus;
