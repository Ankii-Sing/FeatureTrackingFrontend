import SearchBar from "./components/searchBar";
import FeatureTile from "./components/featureTile";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../store/userContext";
import FeatureContext from "./store/featureContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { isAuthenticated } from "../../../utils/auth";

const Feature = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of  per page we took is 5

  const { user } = useContext(UserContext); // Get user object from context
  const { features, setFeatures } = useContext(FeatureContext);
  const navigate = useNavigate(); 

  console.log("User details from the context provider:", user);

  useEffect(() => {
    isAuthenticated() ; // Check if the user is authenticated

    const fetchFeatures = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/public/feature/");
        console.log("Available features:", response.data);
        setFeatures(response.data); // Store features in FeatureContext
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  // Checking if the user is an Admin, Product Manager, or Epic Owner
  const isAdminOrManager = user && ["ADMIN", "PRODUCT_MANAGER", "EPIC_OWNER"].includes(user.role);

  // Filter features based on user assignment (if not admin or manager)
  const filteredFeatures = isAdminOrManager 
    ? features 
    : features.filter(feature => feature.assignedTo?.userId === user.userId);

  // Filter based on search query
  const searchedFeatures = filteredFeatures.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Implement Pagination
  const indexOfLastFeature = currentPage * itemsPerPage;
  const indexOfFirstFeature = indexOfLastFeature - itemsPerPage;
  const currentFeatures = searchedFeatures.slice(indexOfFirstFeature, indexOfLastFeature);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>{user ? `Welcome, ${user.username}` : "Not logged in"}</div>

      <SearchBar onSearch={setSearchQuery} placeholder="Search features..." />

      <h1 className="text-xl font-bold mb-4">Feature List</h1>

      <div>
        {currentFeatures.length > 0 
          ? currentFeatures.map((feature) => (<FeatureTile key={feature.featureId} feature={feature} />))
          : (<p>No features available.</p>)
        }
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(searchedFeatures.length / itemsPerPage)).keys()].map(number => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {/* Floating Button */}
      {isAdminOrManager && (
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/AddFeature")}
        >
          + Add Feature
        </button>
      )}
    </div>
  );
};

export default Feature;