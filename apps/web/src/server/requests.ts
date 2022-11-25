import Cookies from 'js-cookie';
import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3001',
});

export const registerUser = async (data: { username: string; password: string }) => {
  const response = await http.post('/users', data);
  return response;
};

export const createNewTransatcion = async (data: { username: string; value: number }) => {
  const token = Cookies.get('authToken');
  const response = await http.post('/transactions', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getTransectionFitered = async (type: string, query: string) => {
  const token = Cookies.get('authToken');
  switch (type) {
    case 'date':
      return await http.get(`/accounts/filter/transaction/date?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case 'cash-in':
      return await http.get(`/accounts/filter/transactions?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case 'cash-out':
      return await http.get(`/accounts/filter/transactions?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    default:
      break;
  }
};
