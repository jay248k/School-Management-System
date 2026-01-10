import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `https://captivating-essence-production.up.railway.app/api/`,
  withCredentials: true
});
API.defaults.withCredentials = true;
export const adminLoginAPI = async (payload) => {
  console.log(payload);
  try {
    const res = await API.post("admin/login", payload);

    if (res.data.success) {
      return true;
    }
    toast.error(res.data.message);
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

export const registerStudentAPI = async (payload) => {
  try {
    console.log(payload)
    const res = await API.post('student/create', payload);
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
      "Student can not be created";

    toast.error(message);
    return false;
  }
}