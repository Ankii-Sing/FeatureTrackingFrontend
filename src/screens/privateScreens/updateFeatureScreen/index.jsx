// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import fetchUsers from "./API/allUsers";
// import { useLocation } from "react-router-dom";

// const UpdateFeatureScreen = () => {
//   const [users, setUsers] = useState([]);
//   const location = useLocation();
//   const { feature } = location.state;
//   const featureId = feature.featureId;
//   const { userId } = location.state;

//   console.log("Feature:", feature);
//   console.log("User ID:", userId);

//   // State for form fields
//   const [formData, setFormData] = useState({
//     title: feature.title || "",
//     description: feature.description || "",
//     dueDate: feature.dueDate || "",
//     stage: feature.stage || "",
//     status: feature.status || "",
//     assignedTo: feature.assignedTo || "",
//     prodManager: feature.prodManager || "",
//     qaEngineer: feature.qaEngineer || "",
//     epicOwner: feature.epicOwner || "",
//   });

//   console.log("Form Data:", formData);

//   // Fetch users on mount
//   useEffect(() => {
//     fetchUsers()
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = sessionStorage.getItem("token");

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/public/feature/update/${featureId}/${userId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `${token}`,
//           },
//         }
//       );
//       console.log("Updated Form:", formData);
//       alert("Feature updated successfully!");
//       console.log("Update response:", response.data);
//     } catch (error) {
//       console.error("Error updating feature:", error);
//       alert("Failed to update feature.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-6">
//       <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Update Feature</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Feature Title */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Feature Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter feature title"
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 placeholder-slate-400"
//               required
//             />
//           </div>

//           {/* Feature Description */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Feature Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter feature description"
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 placeholder-slate-400 resize-none"
//               rows="4"
//               required
//             />
//           </div>

//           {/* Due Date */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
//             <input
//               type="date"
//               name="dueDate"
//               value={formData.dueDate}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
//               required
//             />
//           </div>

//           {/* Feature Stage */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Feature Stage</label>
//             <select
//               name="stage"
//               value={formData.stage}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
//               required
//             >
 
//               <option value="">Select Stage</option>
//               <option value="TECHNICAL_DESIGN">Technical Design</option>
//               <option value="DEV_TESTING">Dev Testing</option>
//               <option value="QA_TESTING">QA Testing</option>
//               <option value="PRE_POST_DEPLOYMENT">Pre/Post Deployment</option>
//               <option value="SANITY_TESTING_STAGING">Sanity Testing</option>
//               <option value="PRODUCT_GO_AHEAD">Product Go-Ahead</option>
//               <option value="EPIC_OWNER_GO_AHEAD">Epic Owner Go-Ahead</option>
//             </select>
//           </div>

//           {/* Feature Status */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Feature Status</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="IN_PROGRESS">In Progress</option>
//               <option value="COMPLETED">Completed</option>
//               <option value="PENDING">Pending</option>
//             </select>
//           </div>

//           {/* Developer Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Developer</label>
//             <select
//               name="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
//               required
//             >
//               <option value="">Select Developer</option>
//               {users
//                 .filter((u) => u.role === "DEVELOPER")
//                 .map((dev) => (
//                   <option key={dev.userId} value={dev.userId}>
//                     {dev.username}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Product Manager Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Product Manager</label>
//             <select
//               name="prodManager"
//               value={formData.prodManager}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
//               required
//             >
//               <option value="">Select Product Manager</option>
//               {users
//                 .filter((u) => u.role === "PRODUCT_MANAGER")
//                 .map((pm) => (
//                   <option key={pm.userId} value={pm.userId}>
//                     {pm.username}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* QA Tester Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">QA Tester</label>
//             <select
//               name="qaEngineer"
//               value={formData.qaEngineer}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
//               required
//             >
//               <option value="">Select QA Tester</option>
//               {users
//                 .filter((u) => u.role === "QA_ENGINEER")
//                 .map((qa) => (
//                   <option key={qa.userId} value={qa.userId}>
//                     {qa.username}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Epic Owner Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Epic Owner</label>
//             <select
//               name="epicOwner"
//               value={formData.epicOwner}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
//               required
//             >
//               <option value="">Select Epic Owner</option>
//               {users
//                 .filter((u) => u.role === "EPIC_OWNER")
//                 .map((eo) => (
//                   <option key={eo.userId} value={eo.userId}>
//                     {eo.username}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
//           >
//             Update Feature
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateFeatureScreen;

import UpdateFeatureWithNavigation from "./container/updateFeature";

export default UpdateFeatureWithNavigation;
