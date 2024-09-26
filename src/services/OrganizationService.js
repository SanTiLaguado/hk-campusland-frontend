import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const API_GET_USER_ORGS_URL = `${apiUrl}/api/organizacion-usuario/find-organizaciones-of-user`;
const API_GET_ORG_INFO = `${apiUrl}/api/organizacion/find-by-alias`;
const API_GET_ORG_MEMBERS = `${apiUrl}/api/organizacion-usuario/find-users-by-org-id`;
const API_CREATE_ORG_URL = `${apiUrl}/api/organizacion/create`;
const API_ADD_USER_TO_ORG_URL = `${apiUrl}/api/organizacion-usuario/create`;

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not available, please login again');
    }
    return token;
};

export const getUserOrgs = async (userId) => {
    const token = getToken();

    try {
        const response = await axios.get(`${API_GET_USER_ORGS_URL}/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user organizations:', error);
        throw error;
    }
};

export const getOrgInfo = async (alias) => {
    const token = getToken();

    try {
        const response = await axios.get(`${API_GET_ORG_INFO}/${alias}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching organization info:', error);
        throw error;
    }
};

export const getOrgMembers = async (OrgId) => {
    const token = getToken();

    try {
        const response = await axios.get(`${API_GET_ORG_MEMBERS}/${OrgId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching organization members:', error);
        throw error;
    }
};

// Crear una nueva organización
export const createOrganization = async (newOrganization) => {
    const token = getToken();
    try {
        const response = await axios.post(API_CREATE_ORG_URL, newOrganization, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data; // Asegúrate de que el ID esté incluido aquí
    } catch (error) {
        console.error('Error creating organization:', error);
        throw error;
    }
};


// Asociar usuario a la nueva organización
export const addUserToOrganization = async (orgId, userId) => {
    const token = getToken();

    const requestBody = {
        id: {
            organizacion: orgId,
            user: userId
        }
    };

    try {
        const response = await axios.post(API_ADD_USER_TO_ORG_URL, requestBody, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding user to organization:', error);
        throw error;
    }
};
