import { http } from './httpservice';

export const getSupportMessages = () => {
  return http.get('/Admin/Support');
};

export const closeSupportChat = (id) => {
  return http.get(`/Admin/CloseSupport/${id}`);
};

export const getConnectionMessages = () => {
  return http.get('/Admin/Chats');
};

export const sendSupportMessage = (payload) => {
  return http.post('/Admin/Support/SendMessage', payload);
};
