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