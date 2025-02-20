import { useNavigate } from "react-router-dom";

const FeatureTile = ({ feature }) => {
  if (!feature) return null;
  const navigate = useNavigate();

  const handleViewDetails = () => {
    sessionStorage.setItem("FeatureId", feature.featureId);
    navigate("/FeatureStatus");
  };

  const isHighlighted = feature?.status !== "COMPLETED" ? "border-2 border-yellow-500 shadow-lg" : "";

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-3/4 mb-6 mx-auto border border-sky-100 ${isHighlighted}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl text-teal-700">{feature?.title || "No Name"}</h2>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            feature?.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : feature?.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {feature?.status || "Unknown"}
        </span>
      </div>

      <p className="text-slate-600 mt-3">{feature?.description || "No Description Available"}</p>

      <div className="flex justify-between text-sm text-slate-700 mt-4">
        <span>Posted by — {feature?.createdBy?.username || "Unknown"}</span>
        <span className="font-semibold text-slate-600">
          Stage: {feature?.stage || "Pending"}
        </span>
      </div>

      <div className="mt-3 text-slate-800 font-medium">
        Assigned to: {feature?.assignedTo?.username || "No Developer Assigned"}
      </div>

      <button
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors w-full md:w-auto"
        onClick={handleViewDetails}
      >
        View Details
      </button>
    </div>
  );
};

export default FeatureTile;
