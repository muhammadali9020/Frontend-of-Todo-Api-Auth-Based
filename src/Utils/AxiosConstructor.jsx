const APIURL=import.meta.env.VITE_API_URL
import axios from "axios";
const Api = axios.create({
  baseURL:APIURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "token":localStorage.getItem("token")
  },
});
export default Api;
