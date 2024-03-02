import { http } from './httpservice';

export const summary = () => {
  return http.get('/Dashboard/Summary');
};

export const userStats = (period) => {
  return http.get(`/Dashboard/User/Chart/${period}`);
};

export const paymentChart = () => {
  return http.get('/Dashboard/Payment/Chart');
};

export const recentPayment = () => {
  return http.get('/Dashboard/Payment/Recent');
};
