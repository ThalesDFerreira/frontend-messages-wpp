import axios from 'axios';
// import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const API_AUTH = import.meta.env.VITE_REACT_APP_API_AUTH;
const BASE_URL = import.meta.env.VITE_REACT_APP_API_PORT;

const CONFIG = {
  headers: {
    apikey: API_KEY,
    authorization: API_AUTH,
  },
};

const CONFIG_UPLOAD = {
  headers: {
    apikey: API_KEY,
    authorization: API_AUTH,
    'Content-Type': 'multipart/form-data',
  },
};

const api = axios.create({
  baseURL: BASE_URL,
});

// export const setToken = (token) => {
//   api.defaults.headers.common.Authorization = token;
// };

// export const verifyApiKeyAuthorization = () => {
//   const message = 'Não autorizado';
//   const apiKey = api.defaults.headers.common.apikey;
//   const authorization = api.defaults.headers.common.authorization;
//   if (apiKey !== API_KEY) return toast.error(message);
//   if (authorization !== API_AUTH) return toast.error(message);
// };

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint, CONFIG);
  return data;
};

export const requestInsert = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body, CONFIG);
  return data;
};

export const requestEdit = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body, CONFIG);
  return data;
};

export const requestDelete = async (endpoint) => {
  const { data } = await api.delete(endpoint, CONFIG);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body, CONFIG);
  return data;
};

export const requestGet = async (endpoint) => {
  const { data } = await api.get(endpoint, CONFIG);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body, CONFIG);
  return data;
};

export const requestPut = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body, CONFIG);
  return data;
};

export const requestUplaodFile = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body,  CONFIG_UPLOAD);
  return data;
};

export default api;
