import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL

const useAxios = () => {
  const token = localStorage.getItem('token');
  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return instance;
};

export default useAxios;
