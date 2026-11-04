import api from "../api/axios.js";

export async function getHorses(userId, token, signal) {
    const response = await api.get(`/users/${userId}/horses`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        signal
    });

    return response.data;
}

export async function updateHorseActive(horseId, active, token) {
    await api.patch(
        `/horses/${horseId}`,
        { active: !active },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}

export async function deleteHorseFromApi(horseId, token) {

    const appointmentsResponse = await api.get(
        `/horses/${horseId}/appointments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    for (const appointment of appointmentsResponse.data) {
        await api.delete(
            `/appointments/${appointment.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    const healthResponse = await api.get(
        `/horses/${horseId}/horseHealths`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    for (const health of healthResponse.data) {
        await api.delete(
            `/horseHealths/${health.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    const assignmentsResponse = await api.get(
        `/horses/${horseId}/careTaskAssignments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    for (const assignment of assignmentsResponse.data) {
        await api.delete(
            `/careTaskAssignments/${assignment.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    await api.delete(
        `/horses/${horseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}

export async function createHorse(horseData, token) {
    const response = await api.post("/horses", horseData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export async function updateHorseRelations(horseId, relations, token) {
    const response = await api.patch(`/horses/${horseId}`, relations, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export async function getAllHorses(token, signal) {
    const response = await api.get("/horses", {
        headers: {
            Authorization: `Bearer ${token}`
        }, signal
    });

    return response.data;
}