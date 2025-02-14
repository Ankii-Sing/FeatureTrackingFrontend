export const showApproval = (stage, feature) => {
    console.log("showApproval: stage: ", stage);
    console.log("showApproval: feature: ", feature);

    if (feature && stage == "Product Go-Ahead") {
        return feature.prodGoAheadStatus === true ? "Approved" : 
               feature.prodGoAheadStatus === false ? "Declined" : "Pending";
    } 
    else if (feature && stage == "Epic Owner Go-Ahead") {
        return feature.epicOwnerGoAheadStatus === true ? "Approved" : 
               feature.epicOwnerGoAheadStatus === false ? "Declined" : "Pending";
    }
    return "Unknown"; // Default case if approval type is invalid
};