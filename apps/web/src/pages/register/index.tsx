import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { CustomInput } from '../../components/CustomInput';
import { CustomPasswordInput } from '../../components/CustomPasswordInput';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputValues = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setInputValues({ ...inputValues, [name]: event.target.value });
  };

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
            <div className="rounded-md shadow-sm">
              <CustomInput
                label="Nome de usuário"
                id="username"
                name="username"
                type="text"
                required
                value={inputValues.username}
                onChange={handleInputValues}
                className="relative block w-full appearance-none rounded-none 
                      rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                       placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                       focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Nome de usuário"
              />

              <CustomPasswordInput
                label="Senha"
                id="password"
                name="password"
                value={inputValues.password}
                onChange={handleInputValues}
                placeholder="Senha"
                className="relative block w-full appearance-none rounded-none 
                rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 
                placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />

              <CustomPasswordInput
                label="Confirmar Senha"
                id="confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={inputValues.confirmPassword}
                onChange={handleInputValues}
                className="relative block w-full appearance-none rounded-none 
                      rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 
                      placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                      focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirmar Senha"
              />
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
