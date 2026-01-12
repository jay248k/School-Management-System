import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/`,
  withCredentials: true
});

API.defaults.withCredentials = true;

export const teacherFetchClassAPI = async (class_name, section) => {
  try {
    const res = await API.post("class/fetch-student", { class_name, section });

    if (res.data.success) {
      console.log(res.data);
      return res.data.data;
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