import axios from "axios";

export const fetchFeaturesApi = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/public/feature/");
    return response.data;
  } catch (error) {
    console.error("Error fetching features:", error);
    throw error;
  }
};
