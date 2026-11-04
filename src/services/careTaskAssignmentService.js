import api from "../api/axios.js";

export async function getHorseCareTaskAssignments(horseId, token, signal) {
    const response = await api.get(
        `/horses/${horseId}/careTaskAssignments`,
        {
            headers: { Authorization: `Bearer ${token}` }
        },
        signal
    );

    return response.data;
}

export async function getCareTasks(token, signal) {
    const response = await api.get("/careTasks", {
        headers: { Authorization: `Bearer ${token}` },
        signal
    });

    return response.data;
}

export async function completeCareTaskAssignment(id, token) {
    const response = await api.patch(
        `/careTaskAssignments/${id}`,
        { completed: true },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data;
}