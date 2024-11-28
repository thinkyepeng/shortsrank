import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/banner/list', { params });

export const updateData = (data) => axios.post('/admin/banner/update', data);

export const deleteData = (data) => axios.post('/admin/banner/delete', data);
