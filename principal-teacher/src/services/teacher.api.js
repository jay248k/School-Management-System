import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/`,
});
API.defaults.withCredentials = true;
export const addTeacherAPI = async (formData) => {
  try {
    const res = await API.post("teacher/register", formData);
    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "server can not add teacher";

    toast.error(message);
    return false;
  }
}