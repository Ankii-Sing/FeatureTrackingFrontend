const USER_API_URL = "http://localhost:8080/api/public/users";
import axios from "axios";
// import setUsers fro
    
    const fetchUsers = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return console.error("No token found.");

        try {
            const response = await axios.get(USER_API_URL, {
                headers: { Authorization: `${token}` },
            });
            // setUsers(response.data);
            return response.data;
            console.log("Fetched users:", response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    export default fetchUsers;