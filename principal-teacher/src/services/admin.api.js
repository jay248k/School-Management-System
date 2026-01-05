import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin/",
  withCredentials: true
})

API.defaults.withCredentials = true;

export const adminLoginAPI = async (userName, password) => {
  try {
    const res = await API.post("/login", { userName, password });
    if (res.data.success) {
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (error) {
    const msg =
      error?.response?.data?.message || "Principal cannot login";
    toast.error(msg);
  }
};

