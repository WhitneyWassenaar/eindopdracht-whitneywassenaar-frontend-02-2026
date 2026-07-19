// Axios
import axios from "axios";


const api = axios.create(
    {
        baseURL: "https://novi-backend-api-wgsgz.ondigitalocean.app/api",
        headers: {
            "Content-Type": "application/json",
            "novi-education-project-id": import.meta.env.VITE_PROJECT_ID
        }
    }
);

export default api;