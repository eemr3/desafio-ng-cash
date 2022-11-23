import { createContext, ReactNode, useState } from 'react';
import Router from 'next/router';
import { api } from '../server/http';
import Cookies from 'js-cookie';
interface IContext {
  signIn: (data: IUser) => Promise<void>;
  user: string | null;
  isAuthetication: boolean;
  signOut: () => void;
}

interface IUser {
  username: string;
  password: string;
}

export const AuthContext = createContext({} as IContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const isAuthetication = !!user;
  const signIn = async ({ username, password }: IUser) => {
    const response = await api.post('/login', {
      username,
      password,
    });
    Cookies.set('authToken', response.data.token);
    setUser(response.data);
  };

  const signOut = () => {
    Cookies.remove('authToken');
    setUser(null);
    Router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthetication, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
