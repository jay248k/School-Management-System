import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/`,
  withCredentials: true
})

API.defaults.withCredentials = true;

export const studentLoginAPI = async (data) => {
  try {
    const res = await API.post('student/login', data);
    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Student can not be  logined";

    toast.error(message);
    return false;
  }
}