import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export class HttpService {
  public static DOMAIN: string = 'http://localhost:8080';

  public constructor() {
    axios.interceptors.response.use(undefined, (err: AxiosError) => {
      if (!err.response) {
        toast.error('Network Error!');
        return Promise.reject();
      }
      return Promise.reject(err);
    });
  }

  public get = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.get(`${HttpService.DOMAIN}${url}`, config);
  };

  public post = (url: string, body?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.post(`${HttpService.DOMAIN}${url}`, body, config);
  };

  public put = (url: string, body?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.put(`${HttpService.DOMAIN}${url}`, body, config);
  };

  public delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.delete(`${HttpService.DOMAIN}${url}`, config);
  };
}
