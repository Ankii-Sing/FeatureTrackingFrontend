import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../store/userContext";

const USER_API_URL = "http://localhost:8080/api/public/users";
const FEATURE_API_URL = "http://localhost:8080/api/public/feature/add";

const AddFeature = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duedate: "",
    assignedTo: "",
    prodManager: "",
    qaEngineer: "",
    epicOwner: "",
    created_by: "",
  });

  useEffect(() => {
    if (user && user.userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        created_by: String(user.userId),
      }));
    }
  }, [user]);

  // Restrict access
  useEffect(() => {
    if (!user || !["ADMIN", "PRODUCT_MANAGER", "EPIC_OWNER"].includes(user.role)) {
      alert("You are not authorized to add a feature.");
      navigate("/Feature"); // Redirect to features page
    }
  }, [user, navigate]);

  // Fetch users from API on page load
  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found. User may not be authenticated.");
        return;
      }

      try {
        const response = await axios.get(USER_API_URL, {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log("Fetched users:", response.data);
        setUsers(response.data);
        sessionStorage.setItem("users", JSON.stringify(response.data)); // Store users in sessionStorage
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit feature to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    console.log("Printing form data on add feature page:", formData);

    try {
      await axios.post(`${FEATURE_API_URL}`, formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Feature added successfully!");
      navigate("/Feature");
    } catch (error) {
      console.error("Error adding feature:", error);
      alert("Failed to add feature. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Add Feature</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feature Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Feature Name</label>
            <input
              type="text"
              name="title"
              placeholder="Enter feature name"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 placeholder-slate-400"
              required
            />
          </div>

          {/* Feature Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Feature Description</label>
            <textarea
              name="description"
              placeholder="Enter feature description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 placeholder-slate-400 resize-none"
              rows="4"
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input
              type="date"
              name="duedate"
              value={formData.duedate}
              onChange={handleChange}
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
              required
            />
          </div>

          {/* Developer Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Developer</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
              required
            >
              <option value="">Select Developer</option>
              {users
                .filter((u) => u.role === "DEVELOPER")
                .map((dev) => (
                  <option key={dev.userId} value={dev.userId}>
                    {dev.username}
                  </option>
                ))}
            </select>
          </div>

          {/* Product Manager Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Product Manager</label>
            <select
              name="prodManager"
              value={formData.prodManager}
              onChange={handleChange}
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
              required
            >
              <option value="">Select Product Manager</option>
              {users
                .filter((u) => u.role === "PRODUCT_MANAGER")
                .map((pm) => (
                  <option key={pm.userId} value={pm.userId}>
                    {pm.username}
                  </option>
                ))}
            </select>
          </div>

          {/* QA Tester Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">QA Tester</label>
            <select
              name="qaEngineer"
              value={formData.qaEngineer}
              onChange={handleChange}
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
              required
            >
              <option value="">Select QA Tester</option>
              {users
                .filter((u) => u.role === "QA_ENGINEER")
                .map((qa) => (
                  <option key={qa.userId} value={qa.userId}>
                    {qa.username}
                  </option>
                ))}
            </select>
          </div>

          {/* Epic Owner Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Epic Owner</label>
            <select
              name="epicOwner"
              value={formData.epicOwner}
              onChange={handleChange}
              className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400"
              required
            >
              <option value="">Select Epic Owner</option>
              {users
                .filter((u) => u.role === "EPIC_OWNER")
                .map((eo) => (
                  <option key={eo.userId} value={eo.userId}>
                    {eo.username}
                  </option>
                ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Submit Feature
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFeature;

// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import UserContext from "../../../store/userContext";

// const USER_API_URL = "http://localhost:8080/api/public/users";
// const FEATURE_API_URL = "http://localhost:8080/api/public/feature/add";

// const AddFeature = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const [users, setUsers] = useState([]);


//   const [formData, setFormData] = useState({
//     title : "",
//     description: "",
//     duedate: "",
//     assignedTo: "",
//     prodManager: "",
//     qaEngineer: "",
//     epicOwner: "",
//     created_by: ""
//   });

//   useEffect(() => {
//     if (user && user.userId) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,created_by:String( user.userId),}));
//     }
//   }, [user]);

//   //  Restrict access
//   useEffect(() => {
//     if (!user || !["ADMIN", "PRODUCT_MANAGER", "EPIC_OWNER"].includes(user.role)) {
//       alert("You are not authorized to add a feature.");
//       navigate("/Feature"); // Redirect to features page
//     }
//   }, [user, navigate]);

//   // Fetch users from API on page load
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = sessionStorage.getItem("token");

//       if (!token) {
//         console.error("No token found. User may not be authenticated.");
//         return;
//       }

//       try {
//         console.log("Fetching users with token:", token);


//         const response = await axios.get(USER_API_URL, {
//           headers: {
//             Authorization: `${token}`,
//           },
//         });

//         console.log("Fetched users:", response.data);
//         setUsers(response.data);
//         sessionStorage.setItem("users", JSON.stringify(response.data)); // Store users in sessionStorage

//       } catch (error) {
//         console.error("Error fetching users:", error.response?.data || error.message);
//       }
//     };

//     fetchUsers();
//   }, []); 
  
//   console.log("printing users on add feature page", users);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  
//   // Submit feature to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const token = sessionStorage.getItem("token"); 
//     console.log("printing form data on add feature page", formData);

//     try {
//       await axios.post(`${FEATURE_API_URL}`, formData, {
//         headers: {
//           Authorization: `${token}`, // Send token in Authorization header
//           "Content-Type": "application/json", // Ensure JSON format
//         },
//       });
  
//       alert("Feature added successfully!");
//       navigate("/Feature");
//     } catch (error) {
//       console.error("Error adding feature:", error);
//       alert("Failed to add feature. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       <h2 className="text-2xl font-bold mb-6">Add Feature</h2>
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//         {/* Feature Name */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Feature Name"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//           required
//         />

//         {/* Feature Description */}
//         <input
//           type="text"
//           name="description"
//           placeholder="Feature Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//           required
//         />

//         {/* Due Date */}
//         <input
//           type="date"
//           name="duedate"
//           value={formData.duedate}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//           required
//         />

//         {/* Developer Dropdown */}
//         <select
//           name="assignedTo"
//           value={formData.assignedTo}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//           required
//         >
//           <option value="">Select Developer</option>
//           {users.filter((u) => u.role === "DEVELOPER").map((dev) => (
//             <option key={dev.userId} value={dev.userId}>
//               {dev.username}
//             </option>
//           ))}
//         </select>

//         {/* Product Manager Dropdown */}
//         <select
//           name="prodManager"
//           value={formData.prodManager}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//           required
//         >
//           <option value="">Select Product Manager</option>
//           {users.filter((u) => u.role === "PRODUCT_MANAGER").map((pm) => (
//             <option key={pm.userId} value={pm.userId}>
//               {pm.username}
//             </option>
//           ))}
//         </select>

//         {/* QA Tester Dropdown */}
//         <select
//           name="qaEngineer"
//           value={formData.qaEngineer}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//           required
//         >
//           <option value="">Select QA Tester</option>
//           {users.filter((u) => u.role === "QA_ENGINEER").map((qa) => (
//             <option key={qa.userId} value={qa.userId}>
//               {qa.username}
//             </option>
//           ))}
//         </select>

//         {/* Epic Owner Dropdown */}
//         <select
//           name="epicOwner"
//           value={formData.epicOwner}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-3"
//           required
//         >
//           <option value="">Select Epic Owner</option>
//           {users.filter((u) => u.role === "EPIC_OWNER").map((eo) => (
//             <option key={eo.userId} value={eo.userId}>
//               {eo.username}
//             </option>
//           ))}
//         </select>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
//         >
//           Submit Feature
//         </button>
//       </form>   
//     </div>
//   );
// };

// export default AddFeature;