// import React, { useContext, useEffect, useState } from "react";
// import SearchBar from "./components/searchBar";
// import FeatureTile from "./components/featureTile";
// import UserContext from "../../../store/userContext";
// import FeatureContext from "./store/featureContext";
// import axios from "axios";
// import { isAuthenticated } from "../../../utils/auth";
// import Slider from "../SharedComponent/Slider/Slider";
// import { useNavigate } from "react-router-dom";

// const Feature = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5); // Number of features per page
//   const [isSliderOpen, setIsSliderOpen] = useState(false); // State for slider visibility

//   const { user } = useContext(UserContext); // Get user object from context
//   const { features, setFeatures } = useContext(FeatureContext);
//   const navigate = useNavigate();

//   console.log("User details from the context provider:", user);

//   useEffect(() => {
//     isAuthenticated(); // Check if the user is authenticated

//     const fetchFeatures = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/public/feature/");
//         console.log("Available features:", response.data);
//         setFeatures(response.data); // Store features in FeatureContext
//       } catch (error) {
//         console.error("Error fetching features:", error);
//       }
//     };

//     fetchFeatures();
//   }, []);

//   // Check if the user is an Admin, Product Manager, or Epic Owner
//   const isAdminOrManager = user && ["ADMIN", "PRODUCT_MANAGER", "EPIC_OWNER"].includes(user.role);

//   // Filter features based on user assignment (if not admin or manager)
//   const filteredFeatures = isAdminOrManager
//     ? features
//     : features.filter((feature) => feature.assignedTo?.userId === user.userId);

//   // Filter based on search query
//   const searchedFeatures = filteredFeatures.filter((feature) =>
//     feature.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Implement Pagination
//   const indexOfLastFeature = currentPage * itemsPerPage;
//   const indexOfFirstFeature = indexOfLastFeature - itemsPerPage;
//   const currentFeatures = searchedFeatures.slice(indexOfFirstFeature, indexOfLastFeature);

//   // Handle page change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="p-6 bg-gradient-to-br from-sky-50 to-teal-50 min-h-screen relative">
//       {/* Slider (Sidebar) */}
//       <Slider isOpen={isSliderOpen} onClose={() => setIsSliderOpen(false)} />

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto">
//         {/* Welcome Message and Menu Button */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-lg text-teal-700 font-semibold">
//             {user ? `Welcome, ${user.username}` : "Not logged in"}
//           </div>
//           <button
//             className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//             onClick={() => setIsSliderOpen(!isSliderOpen)}
//           >
//             ☰ Menu
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <SearchBar onSearch={setSearchQuery} placeholder="Search features..." />
//         </div>

//         {/* Feature List Header */}
//         <h1 className="text-2xl font-bold text-teal-700 mb-6">Feature List</h1>

//         {/* Feature List */}
//         <div className="space-y-4">
//           {currentFeatures.length > 0 ? (
//             currentFeatures.map((feature) => (
//               <FeatureTile key={feature.featureId} feature={feature} />
//             ))
//           ) : (
//             <p className="text-slate-500">No features available.</p>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-8">
//           {[...Array(Math.ceil(searchedFeatures.length / itemsPerPage)).keys()].map((number) => (
//             <button
//               key={number}
//               onClick={() => paginate(number + 1)}
//               className={`mx-1 px-4 py-2 rounded-lg transition-colors ${
//                 currentPage === number + 1
//                   ? "bg-teal-600 text-white"
//                   : "bg-sky-200 text-slate-700 hover:bg-sky-300"
//               }`}
//             >
//               {number + 1}
//             </button>
//           ))}
//         </div>
//         {isAdminOrManager && (
//           <button
//             className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
//             onClick={() => navigate("/AddFeature")}
//           >
//             + Add Feature
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Feature;


import React from "react";
import Navbar from "../../../shared/navBar";
import FeatureContainerWithNavigation from "./container";

const FeatureScreen = () => {
  return (
    <div>
      <Navbar />
      <FeatureContainerWithNavigation />
    </div>
  );
};

export default FeatureScreen;

