import { RequestContext } from 'next/dist/server/base-server';
import { IoExitOutline } from 'react-icons/io5';
import Image from 'next/image';
import { api } from '../../server/http';
import { useEffect, useState } from 'react';

type Trasaction = {
  id: number;
  value: string;
  transfer: string;
  createdAt: string;
  type: string;
};

export default function Dashboard({ data }: any) {
  const [transaction, setTransaction] = useState<Trasaction[] | null>(null);
  useEffect(() => {
    setTransaction([...data['cash-in'], ...data['cash-out']]);
  }, [data]);

  const formatDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <div className="w-full h-screen">
      <header
        className="w-[100%] bg-[#2d4a22] pt-10 pb-36 h-[300px] flex flex-col items-center
           justify-between relative"
      >
        <Image
          src="/logo.svg"
          alt="logo da aplicação"
          width={0}
          height={0}
          className="w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
        />
        <h2 className="text-white mt-2 text-lg">
          Que bom te ver novamente{' '}
          <span className="text-[#49aa26]">{data.user.username}</span> :)
        </h2>
        <button className="absolute flex items-center top-8 right-4 md:right-24 text-white">
          <IoExitOutline className="mr-1 text-[1.4rem]" />
          Sair
        </button>
      </header>
      <main className="w-content m-auto relative">
        <section className="mt-[-7rem]">
          <div className="bg-[#49aa26] py-6 px-8 mb-8 text-white rounded-[0.25rem]">
            <h3 className="text-base font-normal flex justify-between items-center">
              <span>Balanço</span>
              <Image src="/total.svg" alt="Imagem de total" width={32} height={32} />
            </h3>
            <p className="text-[2rem]">
              {data.balance.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
        </section>
        <section className="block w-full overflow-x-auto">
          <h2 className="sr-only">Transaçoes</h2>
          <button className="button new">+ Nova transação</button>
          <table className="w-full border-spacing-y-[0.5rem] text-[#969cbc]">
            <thead>
              <tr>
                <th className="rounded-t rounded-bl">Histórico</th>
                <th>Usuário</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((item) => (
                <tr key={item.id}>
                  <td>{item.type}</td>
                  <td>{item.transfer}</td>
                  <td
                    className={`${
                      item.type === 'C' ? 'text-[#49aa26]' : 'text-[#e92929]'
                    }`}
                  >
                    {Number(item.value).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx: RequestContext) {
  const token = ctx.req.cookies['authToken'];

  try {
    const res = await api.get('/transactions/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;
    return { props: { data } };
  } catch (error) {
    console.log(error);
  }
}
