import { loginUser } from "../../../service/authservices";

export const handleLoginApi = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    return { success: true, user: response.user };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};
