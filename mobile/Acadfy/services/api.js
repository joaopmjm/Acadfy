import axios from 'axios';

const api = axios.create({ baseURL: "http://107.20.116.185/",});

export default api;