import axios from '@/utils/axios';

export function handleToken(credential:string) {
  return axios.post('/users/oauth/google/login', { credential });
}

export function getUserInfoAsync() {
  return axios.get('/users/me');
}

export function logoutAsync() {
  return axios.post('/users/logout');
}
