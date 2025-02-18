
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
        if (feature.prodGoAheadStatus !== true) return "Blocked"; // ✅ Block Epic Owner if Product Go-Ahead is not approved
        return feature.epicOwnerGoAheadStatus === true
        ? "Approved"
        : feature.epicOwnerGoAheadStatus === false
        ? "Declined"
        : "Pending";
    }
    
    return "Unknown"; 
    

    // if (feature && stage == "Product Go-Ahead") {
    //     return feature.prodGoAheadStatus === true ? "Approved" : 
    //            feature.prodGoAheadStatus === false ? "Declined" : "Pending";
    // } 
    // else if (feature && stage == "Epic Owner Go-Ahead") {
    //     return feature.epicOwnerGoAheadStatus === true ? "Approved" : 
    //            feature.epicOwnerGoAheadStatus === false ? "Declined" : "Pending";
    // }
    // return "Unknown"; // Default case if approval type is invalid
};