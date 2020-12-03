import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerkink-2763d.firebaseio.com/'
});

export default instance;