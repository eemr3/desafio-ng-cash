import { createContext, ReactNode, useState } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { setCookie } from '../helpers/cookies';
import { http } from '../server/requests';

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
    const response = await http.post('/login', {
      username,
      password,
    });

    setCookie('authToken', response.data.token);
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
