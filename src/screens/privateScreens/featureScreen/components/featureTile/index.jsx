import { useNavigate } from "react-router-dom";


const FeatureTile = ({ feature }) => {
    if (!feature) return null; 
    const navigate = useNavigate();

    const handleViewDetails = () => {
      sessionStorage.setItem("FeatureId", feature.featureId); // Storing featureId in sessionStorage. 
      console.log("FeatureId and titile of current clicked feature ", feature.featureId, feature.title);
      navigate("/FeatureStatus"); // move to feature stauts page
    };
  
    return (
      <div className="bg-gray-200 rounded-lg p-4 shadow-md w-full md:w-3/4 mb-4 mx-auto">
        {/* Header */}
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">{feature?.title || "No Name"}</h2>
          <span className="text-sm text-gray-600">
            Due Date: {feature?.dueDate ? new Date(feature.dueDate).toLocaleDateString() : "N/A"}
          </span>
        </div>
  
        {/* Description */}
        <p className="text-gray-700 mt-2">{feature?.description || "No Description Available"}</p>
  
        {/* Posted by & Status */}
        <div className="flex justify-between text-sm text-gray-800 mt-3">
          <span>Posted by — {feature?.createdBy.username || "Unknown"}</span>
          <span>Feature Status: {feature?.status || "Pending"}</span>
        </div>
  
        {/* Developer */}
        <div className="mt-2 text-gray-900 font-semibold">
          {feature?.assignedTo.username || "No Developer Assigned"}
        </div>
        
        <button 
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleViewDetails}
        >
            View Details
        </button>
      </div>
    );
  };
  
  export default FeatureTile;