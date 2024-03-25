import { http } from './httpservice';

export const getRoles = () => {
  return http.get('/Role');
};

export const addUserToRole = (payload) => {
  return http.post('UserRole/AddUserToRole', payload);
};

export const removeUserFromRole = (id) => {
  return http.delete(`UserRole/RemoveUserFromRole/${id}`);
};

export const getUserRoles = (id) => {
  return http.get(`UserRole/ByUserId/${id}`);
};
