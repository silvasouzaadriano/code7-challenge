import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

const apiClients = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export { api, apiClients };
