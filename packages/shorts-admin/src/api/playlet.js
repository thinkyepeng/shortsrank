import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/playlet/list', { params });

export const updateData = (data) => axios.post('/admin/playlet/update', data);

export const deleteData = (data) => axios.post('/admin/playlet/delete', data);