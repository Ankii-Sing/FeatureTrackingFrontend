
// This function is used to show the approval status of a feature based on the stage and feature object

export const showApproval = (stage, feature) => {
    if (!feature) return "Unknown";
    
    if (stage === "Product Go-Ahead") {
        return feature.prodGoAheadStatus === true
        ? "Approved"
        : feature.prodGoAheadStatus === false
        ? "Declined"
        : "Pending";
    }
    
    if (stage === "Epic Owner Go-Ahead") {
        if (feature.prodGoAheadStatus !== true) return "Blocked"; 
        return feature.epicOwnerGoAheadStatus === true
        ? "Approved"
        : feature.epicOwnerGoAheadStatus === false
        ? "Declined"
        : "Pending";
    }
    
    return "Unknown"; 
    
};