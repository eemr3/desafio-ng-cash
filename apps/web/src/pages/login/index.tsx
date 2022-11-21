import { LockClosedIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { CustomInput } from '../../components/CustomInput';
import { CustomPasswordInput } from '../../components/CustomPasswordInput';
import { schema } from './schema';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: () => {
      console.log(formik.values);
    },
  });

  return (
    <>
      <ToastContainer />
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
            onSubmit={formik.handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-4">
                <CustomInput
                  label="Nome de usuário"
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className="relative block w-full appearance-none rounded-none 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                  placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                  focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nome de usuário"
                />
                {formik.errors.username && (
                  <p className="text-red-500">{formik.errors.username}</p>
                )}
              </div>
              <div className="mb-4">
                <CustomPasswordInput
                  label="Senha"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="relative block w-full appearance-none rounded-none 
                rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 
                placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>
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
