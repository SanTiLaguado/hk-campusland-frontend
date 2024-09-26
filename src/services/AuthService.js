import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const API_LOGIN_URL = `${apiUrl}/auth/login`;
const API_REGISTER_URL = `${apiUrl}/auth/register`;


export const login = async (username, password) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { username, password });
    const { token, id, username: serverUsername, nombre, apellido, email } = response.data; // Renombramos la variable de la respuesta

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id, username: serverUsername, nombre, apellido, email }));

    return { token };
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const register = async (username, password, nombre, apellido, genero, email, roles) => {
  try {
    await axios.post(API_REGISTER_URL, { username, password, nombre, apellido, genero, email, roles });
    
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error registering:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); 
  window.location.href = '/login';
};

export const getToken = () => localStorage.getItem('token');

export const getUserInfo = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null; 
};

export const getUserId = () => {
  const user = getUserInfo();

  return user && user.id ? user.id : null;
};


