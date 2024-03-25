import { http } from './httpservice';

export const getNotifications = (startDate = '', endDate = '', page = 0, limit = 10, query = '') => {
  return http.get(`/Notifications/All?startDate=${startDate}&endDate=${endDate}&page=${page}&perPage=${limit}&query=${query}`);
};

export const addNotification = (payload) => {
  return http.post('/Notifications/Add', payload);
};
