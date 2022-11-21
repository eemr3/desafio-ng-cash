import Link from 'next/link';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen">
        <div className="w-full max-w-md space-y-8 m-auto">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Crie sua conta
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Nome de usuário
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none 
                      rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                       placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                       focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nome de usuário"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <div className="w-full flex justify-end items-center relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none 
                      rounded-b-md border border-gray-300 px-3 py-2 text-gray-900
                       placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                       focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Senha"
                  />
                  {showPassword ? (
                    <IoEyeOutline
                      className="absolute mr-2 z-20 w-10"
                      onClick={handleClickShowPassword}
                      cursor="pointer"
                    />
                  ) : (
                    <IoEyeOffOutline
                      className="absolute mr-2 z-20 w-10"
                      onClick={handleClickShowPassword}
                      cursor="pointer"
                    />
                  )}
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="password" className="sr-only">
                  Confirmar senha
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="relative block w-full appearance-none rounded-none 
                      rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 
                      placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                      focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirmar Senha"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border 
                    border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium 
                    text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:ring-offset-2"
              >
                Salvar
              </button>
            </div>
            <div>
              <p>
                Já possui registro?{' '}
                <Link href="/login" className="text-red-600">
                  {' '}
                  Clique aqui.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
