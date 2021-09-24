import axios from 'axios'

export const BackendApi = axios.create( {
  baseURL: 'http://localhost:3000/api',
} )