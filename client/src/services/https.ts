import axios from 'axios';

const endpoint = import.meta.env.VITE_API_ENDPOINT;

const http = axios.create({
  baseURL: endpoint,
  withCredentials: true,
});

export default http;
