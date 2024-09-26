import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const API_CREATE_PROJECT = `${apiUrl}/api/proyecto/create`; 
const API_GET_PROJECTS_BY_ORG = `${apiUrl}/api/organizacionProyecto/find-projects-of-org`;

const API_ASSIGN_PROJECT_TO_ORG = `${apiUrl}/api/organizacionProyecto/create`;

const getToken = () => localStorage.getItem('token');

export const createProject = async (projectData) => {
    const token = getToken();
    console.log(projectData)

    try {
        const response = await axios.post(API_CREATE_PROJECT, projectData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const assignProject = async (orgId, projId) => {
    const token = getToken();
    console.log('orgId:', orgId, 'projId:', projId);

    const requestBody = {
        id: {
            organizacion: orgId,
            proyecto: projId
        }
    };

    try {
        const response = await axios.post(API_ASSIGN_PROJECT_TO_ORG, requestBody, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding user to organization:', error);
        throw error;
    }
};

export const getProjectsByOrg = async (orgId) => {
    const token = getToken();

    try {
        const response = await axios.get(`${API_GET_PROJECTS_BY_ORG}/${orgId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.data.code === 'P-404') {
                console.warn('No hay proyectos registrados a esa organización.');
                return [];
            } else {
                console.error('Error desconocido:', error.response.data.message);
            }
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error al configurar la solicitud:', error.message);
        }
        return [];
    }
};
