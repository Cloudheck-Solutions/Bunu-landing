import { http } from './httpservice';

export const transactions = (startDate = '', endDate = '', page = 1, limit = 10, query = '') => {
  return http.get(`/Admin/Payments/Transactions?startDate=${startDate}&endDate=${endDate}&page=${page}&perPage=${limit}&query=${query}`);
};

export const paymentConfiguration = () => {
  return http.get('/Payments/ConnectionConfiguration');
};

export const updatePaymentConfiguration = (payload) => {
  return http.post('Payments/Configuration/Update', payload);
};
