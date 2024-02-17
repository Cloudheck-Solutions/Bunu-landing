import axios from 'axios';
import config from 'config';

export const http = axios.create({
  baseURL: `${config.apiUrl}/api`,
  timeout: 100000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

const interceptor = (conf) => {
  try {
    const token = localStorage.getItem('token');
    conf.headers.Authorization = token ? `Bearer ${token}` : '';
    return conf;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return conf;
  }
};

export const http2 = axios.create({
  baseURL: config.apiUrl,
  timeout: 100000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

http.interceptors.request.use((conf) => interceptor(conf));

http2.interceptors.request.use((conf) => interceptor(conf));
