import api from "../api/axios.js";

export async function getBoxes(token) {
    const response = await api.get("/boxes", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export async function getUserBoxes(userId, token) {
    const boxes = await getBoxes(token);

    return boxes.filter(
        box => box.userId === userId
    );
}

export async function deleteBox(boxId, token) {
    await api.delete(`/boxes/${boxId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function createBox(userId, boxNumber, token) {
    const response = await api.post(
        "/boxes",
        {
            userId,
            boxNumber
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}