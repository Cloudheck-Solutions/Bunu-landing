import { http } from './httpservice';

export const login = (payload) => {
  return http.post('/Auth/Login', payload);
};

export const register = (payload) => {
  return http.post('/Auth/Register', payload);
};
