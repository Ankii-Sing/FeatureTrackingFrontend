// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import UserContext from "../../../store/userContext";

// const USER_API_URL = "http://localhost:8080/api/public/users";
// const FEATURE_API_URL = "http://localhost:8080/api/public/feature/add";

// const useFeatureForm = () => {
//   const { user } = useContext(UserContext);
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     duedate: "",
//     assignedTo: "",
//     prodManager: "",
//     qaEngineer: "",
//     epicOwner: "",
//     created_by: "",
//   });

//   useEffect(() => {
//     if (user?.userId) {
//       setFormData((prev) => ({ ...prev, created_by: String(user.userId) }));
//     }
//   }, [user]);

//   // Fetch users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = sessionStorage.getItem("token");
//       if (!token) return console.error("No token found.");

//       try {
//         const response = await axios.get(USER_API_URL, {
//           headers: { Authorization: `${token}` },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = sessionStorage.getItem("token");

//     try {
//       await axios.post(FEATURE_API_URL, formData, {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       alert("Feature added successfully!");
//     } catch (error) {
//       console.error("Error adding feature:", error);
//       alert("Failed to add feature.");
//     }
//   };

//   return { users, formData, handleChange, handleSubmit };
// };

// export default useFeatureForm;