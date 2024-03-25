import { http } from './httpservice';

export const getSkills = (page = 1, limit = 10, query = '') => {
  return http.get(`/Admin/Services/All?page=${page}&perPage=${limit}&query=${query}`);
};

export const addSkill = (payload) => {
  return http.post('/Admin/Services/Create', payload);
};

export const editSkill = (id, payload) => {
  return http.put(`/Admin/Services/Edit/${id}`, payload);
};

export const deleteSkillById = (id) => {
  return http.delete(`/Admin/Services/Delete/${id}`);
};
