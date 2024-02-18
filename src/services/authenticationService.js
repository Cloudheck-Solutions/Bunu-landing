import { http } from './httpservice';

export const login = (payload) => {
  return http.post('/Auth/Login', payload);
};

export const register = (payload) => {
  return http.post('/Auth/Register', payload);
};

export const forgotPassword = (payload) => {
  return http.post('/Auth/Forgot', payload);
};

export const resetPassword = (payload) => {
  return http.post('/Auth/Reset', payload);
};
