import { http } from './httpservice';

export const login = (payload) => {
  return http.post('/Auth/Login', payload);
};

export const forgotPassword = (payload) => {
  return http.post('/Auth/Forgot-Password', payload);
};

export const resetPassword = (payload) => {
  return http.post('/Auth/Reset-Password', payload);
};

export const logout = () => {
  return http.get('/Auth/Logout');
};
