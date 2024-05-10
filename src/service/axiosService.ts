import axios, {AxiosRequestConfig} from 'axios';

type OptionProps = {
  url: string;
  method: 'post' | 'get' | 'delete' | 'put';
  token?: string;
  data?: object;
  params?: any;
};

const API_ENDPOINT = 'https://663d71a0e1913c47679449fe.mockapi.io/api/todo';

export default function AxiosService(option: OptionProps) {
  const config: AxiosRequestConfig = {
    url: API_ENDPOINT + option.url,
    method: option.method,
    timeout: 30000,
  };

  if (option.data) {
    config.data = option.data;
  }

  if (option.params) {
    config.params = option.params;
  }

  return axios(config);
}
