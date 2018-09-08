import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpService {
  public static DOMAIN: string = 'http://localhost:8080';

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
