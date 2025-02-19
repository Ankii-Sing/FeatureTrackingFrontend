import React from "react";

const FeatureDetails = ({ feature }) => {
  if (!feature) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-teal-700">{feature.title || "No Name"}</h2>
        <span className="text-slate-500 text-sm">
          Due Date: {feature.dueDate ? new Date(feature.dueDate).toLocaleDateString() : "N/A"}
        </span>
      </div>
      <p className="text-slate-700 mb-6">{feature.description || "No Description Available"}</p>
    </>
  );
};

export default FeatureDetails;
