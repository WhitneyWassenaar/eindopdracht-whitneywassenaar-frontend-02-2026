import api from "../api/axios.js";

export async function getHorseCareTaskAssignments(horseId, token) {
    const response = await api.get(
        `/horses/${horseId}/careTaskAssignments`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data;
}

export async function getCareTasks(token) {
    const response = await api.get("/careTasks", {
        headers: { Authorization: `Bearer ${token}` }
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