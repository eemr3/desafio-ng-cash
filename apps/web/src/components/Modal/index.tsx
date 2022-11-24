import { useFormik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { createNewTransatcion } from '../../server/requests';
import { CustomInput } from '../CustomInput';
import { schema } from './schema';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  refreshData: () => void;
};

export function Modal({ isOpen, closeModal, refreshData }: ModalProps) {
  const formik = useFormik({
    initialValues: {
      username: '',
      value: 0,
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      try {
        const response = await createNewTransatcion(values);
        if (response.status < 300 && response.status >= 200) {
          refreshData();
        }
        console.log(values);

        actions.resetForm();
        closeModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return isOpen ? (
    <div
      className="w-full h-full bg-modal 
        fixed top-0 flex items-center justify-center
        z-10"
    >
      <div className="md:w-[40%] bg-[#f0f2f5] p-[2.4rem]">
        <div>
          <div className="max-[500px]">
            <h2 className="mt-0">Nova Transaçãp</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-[0.8rem]">
                <CustomInput
                  label="Nome do usuário"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder="Nome do usuário"
                  className="relative block w-full appearance-none rounded-none 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                  placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                  focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {formik.errors.username && (
                  <p className="text-[#e92929]">{formik.errors.username}</p>
                )}
              </div>
              <div className="mt-[0.8rem]">
                <CustomInput
                  label="Valor da transação"
                  id="value"
                  name="value"
                  value={formik.values.value}
                  onChange={formik.handleChange}
                  placeholder="0,00"
                  type="number"
                  className="relative block w-full appearance-none rounded-none 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                  placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                  focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {formik.errors.value && (
                  <p className="text-[#e92929]">{formik.errors.value}</p>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="text-[#e92929] border border-[#e92929] rounded 
                    w-[48%] h-[50px] opacity-60 hover:opacity-100"
                  onClick={closeModal}
                  type="submit"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-[48%] h-[50px] text-white bg-[#49aa26] rounded hover:bg-[#3dd705]"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
