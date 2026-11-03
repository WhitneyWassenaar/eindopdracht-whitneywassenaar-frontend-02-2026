import api from "../api/axios.js";

export async function getDashboardData(userId, token) {
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const horsesResponse = await api.get(
        `/users/${userId}/horses`,
        { headers }
    );

    const horses = horsesResponse.data;

    const boxesResponse = await api.get(
        `/users/${userId}/boxes`,
        { headers }
    );

    const appointmentsResponse = await api.get(
        `/users/${userId}/appointments`,
        { headers }
    );

    const careTaskAssignmentResponse = await api.get(
        `/careTaskAssignments`,
        { headers }
    );

    return {
        horses,
        boxes: boxesResponse.data,
        appointments: appointmentsResponse.data.filter(appointment =>
            horses.some(horse => horse.id === appointment.horseId)
        ),
        careTasks: careTaskAssignmentResponse.data.filter(task =>
            horses.some(horse => horse.id === task.horseId)
        )
    };
}