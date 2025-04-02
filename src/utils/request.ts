import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { serverIp } from './serverIp';

const request: AxiosInstance = axios.create({
    baseURL: `${serverIp}`,
    timeout: 3000
} as AxiosRequestConfig);

export default request;