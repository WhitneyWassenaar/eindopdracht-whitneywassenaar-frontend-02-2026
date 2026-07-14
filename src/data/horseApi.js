import projectId from './projectId.js';

const apiUrl = 'https://novi-backend-api-wgsgz.ondigitalocean.app/api';

export async function getHorses(token) {
    const response = await fetch(`${apiUrl}/horses`,
        {
            headers:{
                "novi-education-project-id":projectId,
                "Authorization": `Bearer ${token}`
            }
        });

    if (!response.ok) {
        Error("Paarden ophalen mislukt");
    }

    return await response.json();
}
