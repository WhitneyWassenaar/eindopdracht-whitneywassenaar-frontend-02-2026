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

export async function getCareTasksByUser(parentId, token) {
    const response = await api.get(
        `/users/${parentId}/careTasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function deleteCareTask(id, token) {
    await api.delete(`/careTasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function getHorseCareTaskAssignments(horseId, token) {
    const response = await api.get(
        `/horses/${horseId}/careTaskAssignments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function assignCareTask(assignmentData, token) {
    const response = await api.post(
        "/careTaskAssignments",
        assignmentData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}