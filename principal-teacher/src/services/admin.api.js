import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/admin`,
});
export const adminLoginAPI = async (payload) => {
  console.log(payload);
  try {
    const res = await API.post("/login", payload);

    if (res.data.success) {
      return true;
    }
    toast.error(res.data.message || "Invalid credentials");
    return false;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Login failed";

    toast.error(message);
    return false;
  }
};
