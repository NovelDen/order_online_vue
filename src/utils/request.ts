import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { serverIp } from './serverIp';

const request: AxiosInstance = axios.create({
    baseURL: `${serverIp}`,
    timeout: 3000
} as AxiosRequestConfig);
request.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')?localStorage.getItem('token'):null;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;