import api from "../api/axios.js";

export async function getCareTasks(token) {
    const response = await api.get("/careTasks", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export async function createCareTask(careTaskData, token) {
    const response = await api.post("/careTasks", careTaskData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}