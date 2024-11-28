import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/category/list', { params });

export const updateData = (data) => axios.post('/admin/category/update', data);

export const deleteData = (data) => axios.post('/admin/category/delete', data);