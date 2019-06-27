import axios from 'axios';
import config from '../config'

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 60000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
});

// instance.interceptors.request.use(function (config) {
//   config.headers.Authorization = 'Bearer ' + getCookie('token');
//   return config;
// })

export default instance;
