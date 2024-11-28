import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/user/list', { params });

export const updateData = (data) => axios.post('/admin/user/update', data);

export const login = (data) => axios.post('/users/login', data);

export const getUserInfo = () => axios.get('/users/me');

export const getUserInfoAsync = () => axios.get('/admin/users/me');
