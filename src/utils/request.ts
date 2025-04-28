<<<<<<< HEAD
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

=======
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

>>>>>>> 1c15f16ed4ec227176339327f962eaf1df58175f
export default request;