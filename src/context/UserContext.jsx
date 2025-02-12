import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = sessionStorage.getItem("user"); 
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
     catch (error) {
      console.error("Error parsing user data from sessionStorage:", error);}
    }, []); 

  console.log("User data in JSON:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;