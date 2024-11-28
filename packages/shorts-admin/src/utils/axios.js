import axios from 'axios';
import storage from './storage';

// eslint-disable-next-line no-undef
axios.defaults.baseURL = API_PREFIX;
axios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-undef
  const token = storage.get(TOKEN_NAME);
  if (token) {
    const headers = config.headers || {};
    config.headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    throw new Error(response.data.message);
  } else {
    return response.data.data;
  }
}, (error) => Promise.reject(error));
