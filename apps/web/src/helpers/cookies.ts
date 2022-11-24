import Cookies from 'js-cookie';

export const setCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes,
) => {
  Cookies.set(key, value, {
    ...options,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
};

export const getCookie = (key: string) => {
  Cookies.get(key);
};
