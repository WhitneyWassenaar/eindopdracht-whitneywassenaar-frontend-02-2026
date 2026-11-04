import api from "../api/axios.js";

export async function createAppointment(appointmentData, token) {
    const response = await api.post(
        "/appointments",
        appointmentData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}


export async function getHorseAppointments(horseId, token, signal) {
    const response = await api.get(`/horses/${horseId}/appointments`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        signal
    });

    return response.data;
}

export async function getUserContacts(userId, token, signal) {
    const response = await api.get(`/users/${userId}/persons`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        signal
    });

    return response.data;
}

export async function deleteAppointment(id, token) {
    const response = await api.delete(`/appointments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}