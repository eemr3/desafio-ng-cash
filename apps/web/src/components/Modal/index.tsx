import { CustomInput } from '../CustomInput';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export function Modal({ isOpen, closeModal }: ModalProps) {
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
            <form action="">
              <div className="mt-[0.8rem]">
                <CustomInput
                  label="Nome do usuário"
                  id="username"
                  placeholder="Nome do usuário"
                  className="relative block w-full appearance-none rounded-none 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                  placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                  focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-[0.8rem]">
                <CustomInput
                  label="Valor da transação"
                  id="value"
                  placeholder="0,00"
                  type="number"
                  className="relative block w-full appearance-none rounded-none 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                  placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                  focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
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
                <button className="w-[48%] h-[50px] text-white bg-[#49aa26] rounded hover:bg-[#3dd705]">
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
