import axios from "axios";

const updateFeatureApi = async (feature, userId) => {
    const featureId = feature.featureId;

    console.log("Feature ID:", featureId);
    console.log("User ID:", userId);
    console.log("Feature stage:", feature.stage);

    if (!featureId || !userId) {
        console.error("Feature ID or User ID is missing.");
        return;
    }

    
     const payload = {
        title: feature.title || "",
        description: feature.description || "",
        dueDate: feature.dueDate || "",
        stage: feature.stage || "",
        status: feature.status || "",
        assignedTo: feature.assignedTo.userId || "",
        prodManager: feature.prodManager.userId || "",
        qaEngineer: feature.qaEngineer.userId || "",
        epicOwner: feature.epicOwner.userId || "",
      };

      console.log("Payload:", payload); 

      try {
        const token = sessionStorage.getItem("token");
    
        const response = await axios.post(
            `http://localhost:8080/api/public/feature/update/${featureId}/${userId}`,
            payload,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
    
        console.log("Update successful:", response.data);
    } catch (error) {
        console.error("Error updating:", error);
    }
};

export default updateFeatureApi;
