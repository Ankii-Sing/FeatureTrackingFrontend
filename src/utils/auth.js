export const isAuthenticated = () => {
    const token = sessionStorage.getItem("token");
  
    if (!token) return false; // No token, user is not authenticated
  
    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      const expiryTime = tokenPayload.exp * 1000; // Convert to milliseconds
  
      if (Date.now() > expiryTime) {
        sessionStorage.removeItem("token"); // Remove expired token
        return false;
      }
  
      return true;
    } catch (error) {
      return false; // Invalid token format
    }
  };