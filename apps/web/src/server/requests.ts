import Cookies from 'js-cookie';
import { api } from './http';

const token = Cookies.get('authToken');
export const registerUser = async (data: { username: string; password: string }) => {
  const response = await api.post('/users', data);
  return response;
};

export const createNewTransatcion = async (data: { username: string; value: number }) => {
  const response = await api.post('/transactions', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTransectionFitered = async (type: string, query: string) => {
  switch (type) {
    case 'date':
      return await api.get(`/accounts/filter/transaction/date?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case 'cash-in':
      return await api.get(`/accounts/filter/transactions?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case 'cash-out':
      return await api.get(`/accounts/filter/transactions?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    default:
      break;
  }
};
