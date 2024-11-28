import axios from 'axios';

export const getListAsync = (params) => axios.get('/admin/logs/list', { params });

export const getVisitorsAsync = () => axios.get('/admin/logs/visitors/today');
