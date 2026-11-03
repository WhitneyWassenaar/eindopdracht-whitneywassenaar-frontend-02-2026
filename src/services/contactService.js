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

export async function updateContactActive(contact, token) {
    const response = await api.patch(
        `/persons/${contact.id}`,
        { active: !contact.active },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function deleteContactFromApi(contactId, token) {
    const response = await api.delete(`/persons/${contactId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export async function getAllPersons(token) {
    const response = await api.get("/persons", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}