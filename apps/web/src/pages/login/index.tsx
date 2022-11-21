import { LockClosedIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CustomInput } from '../../components/CustomInput';
import { CustomPasswordInput } from '../../components/CustomPasswordInput';

const checkName = (name: string) => /^[a-zA-ZÀ-ü ]{3}/g.test(name);
const checkPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(password);

export default function Login() {
  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputValues = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setInputValues({ ...inputValues, [name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkName(inputValues.username)) {
      return setError('Nome de usário incorreto');
    }
    if (!checkPassword(inputValues.password)) {
      setError('');
      return setError('Password formato incorreto');
    }
    console.log(inputValues);
  };

  return (
    <>
      <div
        className="flex min-h-full items-center justify-center py-12 px-4 
          sm:px-6 lg:px-8 h-screen"
      >
        <div className="w-full max-w-md space-y-8 m-auto">
          <div>
            <h2
              className="mt-6 text-center text-3xl font-bold tracking-tight 
              text-gray-900"
            >
              Faça login em sua conta
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <CustomInput
                label="Nome de usuário"
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={inputValues.username}
                onChange={handleInputValues}
                className="relative block w-full appearance-none rounded-none 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                  placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                  focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Nome de usuário"
              />
              {error ? <p>{error}</p> : ''}
              <CustomPasswordInput
                label="Senha"
                id="password"
                name="password"
                value={inputValues.password}
                onChange={handleInputValues}
                className="relative block w-full appearance-none rounded-none 
                rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 
                placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {error ? <p>{error}</p> : ''}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md 
                  border border-transparent bg-indigo-600 py-2 px-4 text-sm 
                  font-medium text-white hover:bg-indigo-700 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Entrar
              </button>
            </div>
            <div>
              <p>
                Não tem uma conta?{' '}
                <Link href="/register" className="text-red-600">
                  {' '}
                  Registre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
