import axios from 'axios';

const api = axios.create({
    baseURL: 'https://banhodogs.herokuapp.com/'
})

export default api;