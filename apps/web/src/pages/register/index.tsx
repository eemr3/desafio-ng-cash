import { useFormik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { CustomInput } from '../../components/CustomInput';
import { CustomPasswordInput } from '../../components/CustomPasswordInput';
import { responseErrorStatusCode } from '../../helpers/httpStatusCode';
import { registerSchema } from '../../helpers/yupSchemas';
import { registerUser } from '../../server/requests';

export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async () => {
      try {
        await registerUser({
          username: formik.values.username,
          password: formik.values.password,
        });
        Router.push('/login');
      } catch (error) {
        if ((error as any).response.status === 409) {
          toast.error(responseErrorStatusCode(409));
        }
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen">
        <div className="w-full max-w-md space-y-8 m-auto">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Crie sua conta
            </h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6" method="POST">
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <CustomInput
                  label="Nome de usuário"
                  id="username"
                  name="username"
                  type="text"
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
                  placeholder="Senha"
                  className="relative block w-full appearance-none rounded-none 
                rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 
                placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>
              <div className="mb-4">
                <CustomPasswordInput
                  label="Confirmar Senha"
                  id="confirm-password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  className="relative block w-full appearance-none rounded-none 
                      rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 
                      placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                      focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirmar Senha"
                />
                {formik.errors.confirmPassword && (
                  <p className="text-red-500">{formik.errors.confirmPassword}</p>
                )}
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
