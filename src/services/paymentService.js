import { http } from './httpservice';

export const transactions = (startDate = '', endDate = '', page = 1, limit = 10, query = '') => {
  return http.get(`/Admin/Payments/Transactions?startDate=${startDate}&endDate=${endDate}&page=${page}&perPage=${limit}&query=${query}`);
};
