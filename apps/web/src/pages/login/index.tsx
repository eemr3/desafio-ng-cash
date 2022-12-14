import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { ToastContainer, toast } from 'react-toastify';
import { CustomInput } from '../../components/CustomInput';
import { CustomPasswordInput } from '../../components/CustomPasswordInput';

import { AuthContext } from '../../context/AuthProvider';
import { loginSchema } from '../../helpers/yupSchemas';

export default function Login() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async () => {
      try {
        await signIn(formik.values);
        router.push('/dashboard');
      } catch (error) {
        toast.error((error as any).response.data.message);
      }
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
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6" method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-4">
                <CustomInput
                  label="Nome de usuário"
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
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
                  border border-transparent bg-[#49aa26] py-2 px-4 text-sm 
                  font-medium text-white hover:bg-[#37801d] focus:outline-none 
                  focus:ring-2 focus:ring-[#52bf2b] focus:ring-offset-2 disabled:opacity-50"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-[#58bb34] group-hover:text-[#5fdc32]"
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
