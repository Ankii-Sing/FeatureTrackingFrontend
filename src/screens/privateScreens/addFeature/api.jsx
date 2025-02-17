import axios from "axios";

const USER_API_URL = "http://localhost:8080/api/public/users";
const FEATURE_API_URL = "http://localhost:8080/api/public/feature/add";

export const fetchUsers = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found.");
    const response = await axios.get(USER_API_URL, { headers: { Authorization: `${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const addFeature = async (formData) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found.");
    await axios.post(FEATURE_API_URL, formData, { headers: { Authorization: `${token}`, "Content-Type": "application/json" } });
    alert("Feature added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding feature:", error);
    alert("Failed to add feature.");
    return false;
  }
};
