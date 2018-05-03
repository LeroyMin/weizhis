import axios from 'axios';

let base = '/spring-boot';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };