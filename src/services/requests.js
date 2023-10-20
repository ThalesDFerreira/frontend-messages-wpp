import axios from 'axios';

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

export const requestDelete = async (endpoint) => {
  const { data } = await api.delete(endpoint, CONFIG);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body, CONFIG);
  return data;
};

export const requestUplaodFile = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body, CONFIG_UPLOAD);
  return data;
};

export default api;
