import axios from "axios";

const BASE_URL = "http://localhost:8080/api/public/feature";

// Fetch feature details
export const fetchFeatureDetails = async (featureId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${featureId}`, {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feature:", error);
    return null;
  }
};

// Fetch documents by Feature ID
export const fetchDocumentsByFeatureId = async (featureId) => {
    if (!featureId) {
      console.error("Feature ID is missing. Cannot fetch documents.");
      return [];
    }
    const token = sessionStorage.getItem("token");
  
    try {
        const response = await axios.get(`http://localhost:8080/api/public/doc/${featureId}`, {
            headers: { Authorization: `${token}` }
          });
          
      console.log("Fetched documents:", response.data);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching documents:", error.response?.data || error.message);
      return [];
    }
  };
  

// Submit approval
export const submitApproval = async (featureId, stage, status, userId, token) => {
  try {
    await axios.post(`${BASE_URL}/approval`, { featureId, stage, status, userId }, {
      headers: { Authorization: `${token}` },
    });
  } catch (error) {
    console.error("Error updating approval status:", error);
  }
};
