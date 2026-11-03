import api from "../api/axios.js";

export async function getHorseHealth(horseId, token) {
    const response = await api.get(
        `/horses/${horseId}/horseHealths`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function updateHorseHealth(healthId, formData, token) {
    const response = await api.patch(
        `/horseHealths/${healthId}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function createHorseHealth(healthData, token) {
    const response = await api.post(
        "/horseHealths",
        healthData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}