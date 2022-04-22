import axios from 'axios';
import router from "../router"
import {Message} from "element-ui";
const BASE_URL = 'http://localhost:8080'

export function request(options){
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
  });

  instance.interceptors.response.use(res => {
    if (res.data.code === '401'){
      router.push('/login');
    }
    return res.data;
  }, err => {
    Message.error('系统错误')
  });

  return instance(options);
}