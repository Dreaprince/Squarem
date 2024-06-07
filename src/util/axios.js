import axios from "axios";
import {Baseurl} from './constants'

const instance = axios.create({
  baseURL: Baseurl,
  // withCredentials: false,
});

instance.interceptors.request.use((config) => {
  let token = localStorage.getItem("ut");
  config.headers['Authorization'] = `Bearer ${token}`;
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  
  // console.log('config', config)
  return config;
});


export default instance;
