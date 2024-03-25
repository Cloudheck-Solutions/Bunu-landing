import { http } from './httpservice';

export const getDocuments = (id, type) => {
  return http.get(`/Verification/documents/entity/${id}?type=${type}`);
};

export const updateDocumentStatus = (id, status) => {
  return http.get(`/Verification/document/updateStatus/${id}/${status}`);
};
