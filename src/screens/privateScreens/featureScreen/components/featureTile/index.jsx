import { useNavigate } from "react-router-dom";

const FeatureTile = ({ feature }) => {
  if (!feature) return null;
  const navigate = useNavigate();

  const handleViewDetails = () => {
    sessionStorage.setItem("FeatureId", feature.featureId); // Storing featureId in sessionStorage
    console.log(
      "FeatureId and title of current clicked feature ",
      feature.featureId,
      feature.title
    );
    navigate("/FeatureStatus"); // Move to feature status page
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-3/4 mb-6 mx-auto border border-sky-100">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl text-teal-700">
          {feature?.title || "No Name"}
        </h2>
        <span className="text-sm text-slate-500">
          Due Date:{" "}
          {feature?.dueDate
            ? new Date(feature.dueDate).toLocaleDateString()
            : "N/A"}
        </span>
      </div>

      <p className="text-slate-600 mt-3">
        {feature?.description || "No Description Available"}
      </p>

      <div className="flex justify-between text-sm text-slate-700 mt-4">
        {/* Posted By */}
        <span>Posted by — {feature?.createdBy?.username || "Unknown"}</span>

        {/* Stage on top, Status below */}
        <div className="flex flex-col items-end">
          <span className={`font-semibold text`}
          >
            Stage: {feature.stage || "TECHNICAL_DESIGN"}
          </span>

          <span
            className={`font-semibold ${
              feature?.status === "COMPLETED"
                ? "text-green-600"
                : "text-slate-700"
            }`}
          >
            Status: {feature.status || "PENDING"}
          </span>
        </div>
      </div>

      <div className="mt-3 text-slate-800 font-medium">
        Assigned to: {feature?.assignedTo.username || "No Developer Assigned"}
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
