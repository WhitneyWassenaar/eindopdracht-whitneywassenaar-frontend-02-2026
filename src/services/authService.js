import api from "../api/axios.js";

export async function loginUser(email, password) {
    const response = await api.post("/login", {
        email,
        password
    });

    return response.data;
}

export async function getUserByEmail(email, token) {
    const response = await api.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.find(user => user.email === email);
}

export async function getUserProfile(userId, token) {
    const response = await api.get(`/users/${userId}/userProfiles`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data[0];
}

export async function registerUser(userData) {
    const response = await api.post("/users", userData);
    return response.data;
}

export async function createUserProfile(profileData) {
    const response = await api.post("/userProfiles", profileData);
    return response.data;
}