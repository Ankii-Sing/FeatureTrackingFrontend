import axios from "axios";
import fetchUsers from "./allUsers";

export { fetchUsers };

export const updateFeature = async (featureId, userId, formData) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found.");
    await axios.post(`http://localhost:8080/api/public/feature/update/${featureId}/${userId}`, formData, {
      headers: { Authorization: `${token}`, "Content-Type": "application/json" },
    });
    alert("Feature updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating feature:", error);
    alert("Failed to update feature.");
    return false;
  }
};
