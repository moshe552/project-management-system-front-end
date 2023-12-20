import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bb-projects-db-api-mego-program1.vercel.app',
});

export {api} ;

