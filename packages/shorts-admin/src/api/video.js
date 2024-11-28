import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/video/list', { params });

export const updateData = (data) => axios.post('/admin/video/update', data);

export const deleteData = (data) => axios.post('/admin/video/delete', data);