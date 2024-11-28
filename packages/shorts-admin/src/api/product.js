import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/product/list', { params });

export const updateData = (data) => axios.post('/admin/product/update', data);

export const deleteData = (data) => axios.post('/admin/product/delete', data);