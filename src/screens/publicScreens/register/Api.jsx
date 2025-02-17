import { registerUser } from "../../../service/authservices";

export const handleRegisterApi = async (username, email, password, userRole) => {
  try {
    await registerUser({ username, email, password, userRole });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Registration failed" };
  }
};
