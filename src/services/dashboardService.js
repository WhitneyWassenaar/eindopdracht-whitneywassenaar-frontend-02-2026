import api from "../api/axios.js";

export async function getDashboardData(userId, token, signal) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        signal
    };

    const horsesResponse = await api.get(
        `/users/${userId}/horses`,
        { ...config }
    );

    const horses = horsesResponse.data;

    const boxesResponse = await api.get(
        `/users/${userId}/boxes`,
        {...config }
    );

    const appointmentsResponse = await api.get(
        `/users/${userId}/appointments`,
        { ...config}
    );

    const careTaskAssignmentResponse = await api.get(
        `/careTaskAssignments`,
        { ...config }
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