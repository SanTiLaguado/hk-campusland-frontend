import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const API_GET_TASKS_BY_PROJECT = `${apiUrl}/api/tarea/find-tareas-by-proyecto`;
const API_CREATE_TASK = `${apiUrl}/api/tarea`; 


const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not available, please login again');
    }
    return token;
};


export const getTaskByProject = async (projectId) => {
    const token = getToken();

    try {
        const response = await axios.get(`${API_GET_TASKS_BY_PROJECT}/${projectId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks by project:', error);
        throw error;
    }
};


export const createTask = async (taskData) => {
    const token = getToken();

    try {
        const response = await axios.post(API_CREATE_TASK, taskData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};
