// Axios
import axios from "axios";

// Data
import projectId from "../data/projectId.js";

const api = axios.create(
    {
        baseURL: "https://novi-backend-api-wgsgz.ondigitalocean.app/api",
        headers: {
            "Content-Type": "application/json",
            "novi-education-project-id": projectId
        }
    }
);

export default api;