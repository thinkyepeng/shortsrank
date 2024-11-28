import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/order/list', { params });
