import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://16.184.13.235:8888/api',
  timeout: 30000,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = getAuthorization();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response, // 성공 응답 그대로 반환
  async (error) => {
    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

export default API;
