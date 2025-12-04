import axios from 'axios';

const instance = axios.create({
    baseURL:import.meta.env.MODE =="development" ? 'http://localhost:5000/api/' : import.meta.env.VITE_BACKEN_URL +'/api/',
    withCredentials: true,

});

export default instance;