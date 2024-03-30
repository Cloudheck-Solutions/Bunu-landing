import { http } from './httpservice';

export const allArtisanUsers = (page = 1, limit = 10, query = '') => {
  return http.get(`/Users/Artisan/All?page=${page}&perPage=${limit}&query=${query}`);
};

export const allClientUsers = (page = 1, limit = 10, query = '') => {
  return http.get(`/Users/Client/All?page=${page}&perPage=${limit}&query=${query}`);
};

export const allAdminUsers = (page = 1, limit = 10, query = '') => {
  return http.get(`/Users/Admin/All?page=${page}&perPage=${limit}&query=${query}`);
};

export const allOrganizationAdminUsers = (page = 1, limit = 10, query = '') => {
  return http.get(`/Organization/User/Admin/All?page=${page}&perPage=${limit}&query=${query}`);
};

export const getUserById = (id) => {
  return http.get(`/User/${id}`);
};

export const updateUserStatus = (payload) => {
  return http.post('/Users/Status/Update', payload);
};

export const userVerification = (payload) => {
  return http.post('/Users/AdminVerification', payload);
};

export const usersSummary = () => {
  return http.get('/Users/Summary/All');
};

export const updateUser = (id, payload) => {
  return http.put(`/User/Profile/Update/${id}`, payload);
};

export const updateUserDp = (id, payload) => {
  return http.post(`/User/Profile/UpdateDP/${id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
