import axios from 'axios';

// eslint-disable-next-line no-undef
axios.defaults.baseURL = API_PREFIX;

axios.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    throw new Error(response.data.msg);
  } else {
    return response.data.data;
  }
}, (error) => Promise.reject(error));

export default axios;
