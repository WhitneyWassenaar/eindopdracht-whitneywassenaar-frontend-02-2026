import api from "../api/axios.js";

export async function getContacts(userId, token) {
    const response = await api.get(
        `/users/${userId}/persons`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function createContact(contactData, token) {
    const response = await api.post("/persons", contactData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}