import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.shop/v1'
});

export default instance;
