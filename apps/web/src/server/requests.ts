import { api } from './http';

export const registerUser = async (data: { username: string; password: string }) => {
  const response = await api.post('/users', data);
  return response;
};
