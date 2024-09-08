import axios from 'axios';
import { baseUrl } from './env';
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
    baseURL: baseUrl,
    responseType: 'json',
    custom: {
      toast: true
    }
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('screenToken');
    if(token) {
      config.headers['token'] = token
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
    (response) => {
      if (response.data.code && response.data.code != 200) {
        // 登录失效，清空缓存后，跳转登录页
        if (response.data.code == 204) {
          MessageBox.confirm('很抱歉，登录已过期，请重新登录!', '登录已过期', {
            type: 'warning',
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false
          }).then(() => {
            localStorage.clear()
            location.reload()
          })
        } else {
          Message.error(response.data.msg)
        }
        return Promise.reject(response.data)
      }
      return response.data.data || response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default service;
