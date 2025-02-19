export const isAuthenticated = () => {
    const token = sessionStorage.getItem("token");
  
    if (!token) return false; 
  
    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT and convert to milliseconds
      const expiryTime = tokenPayload.exp * 1000; 
  
      if (Date.now() > expiryTime) {
        sessionStorage.removeItem("token"); 
        return false;
      }
  
      return true;
    } catch (error) {
      return false; 
    }
  };