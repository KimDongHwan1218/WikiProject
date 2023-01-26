import axios, { AxiosInstance } from 'axios';
import cookies from 'js-cookie';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `192.168.35.94`, // 기본 서버 주소 입력
  headers: {
    access_token: cookies.get('access_token'),
  },
});