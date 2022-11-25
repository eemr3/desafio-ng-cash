import { AxiosError } from 'axios';
import { RequestContext } from 'next/dist/server/base-server';
import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';
import { isTokenExpired } from '../../helpers/auth';
import { api } from '../../server/http';
import { getTransectionFitered } from '../../server/requests';
type Transaction = {
  id: number;
  value: string;
  transfer: string;
  createdAt: string;
  type: string;
};
interface TransactionProps {
  transactions: Transaction[];
  data: any;
}

const RADIO_VALUES = [
  {
    id: 1,
    name: 'fitered',
    value: 'all',
    idName: 'filter-option',
    label: 'Todos',
  },
  {
    id: 2,
    name: 'fitered',
    value: 'date',
    idName: 'filter-option',
    label: 'Data',
  },
  {
    id: 3,
    name: 'fitered',
    value: 'cash-in',
    idName: 'filter-option',
    label: 'Valores recebidos',
  },
  {
    id: 4,
    name: 'fitered',
    value: 'cash-out',
    idName: 'filter-option',
    label: 'Valores enviados',
  },
];

export default function Transactions({ transactions, data }: TransactionProps) {
  const [inputSelected, setInputSelected] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [transactionsData, setTransactionsData] = useState<any>();

  useEffect(() => {
    if (inputSelected === 'all') {
      setTransactionsData(transactions);
      return;
    }
  }, [inputSelected, transactions]);

  const formatDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    if (inputSelected === 'cash-in') {
      return setInputValue('cash-in');
    }
    setInputValue(event.currentTarget.value);
  };

  const handleSelected = (event: FormEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.value === 'cash-in' ||
      event.currentTarget.value === 'cash-out'
    ) {
      setInputValue(event.currentTarget.value);
      setInputSelected(event.currentTarget.value);
      return;
    }
    setInputSelected(event.currentTarget.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await getTransectionFitered(inputSelected, inputValue);
      const data = response?.data;
      if (inputSelected === 'cash-in') {
        setTransactionsData([...data['cash-in']]);
        return;
      }
      if (inputSelected === 'cash-out') {
        setTransactionsData([...data['cash-out']]);
        return;
      }
      setTransactionsData([...data['cash-in'], ...data['cash-out']]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-[#f0f2f5]">
      <Header data={data} locale="transactions" />
      <main className="w-content m-auto relative">
        <section className="mt-[-7rem]">
          <div className="bg-[#49aa26] py-6 px-8 mb-8 text-white rounded-[0.25rem]">
            <h3 className="text-lg text-center font-normal mb-8">
              <span>Transações</span>
            </h3>
            <h3 className="text-base mb-2">Filtrar transações por</h3>
            <div className="flex flex-col md:items-center md:flex-row md:justify-around">
              {RADIO_VALUES.map((item) => (
                <div key={item.id} className="flex items-center mb-4">
                  <input
                    id={`${item.idName}-${item.id}`}
                    type="radio"
                    name={item.name}
                    value={item.value}
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="filter-option-1"
                    aria-describedby="filter-option-1"
                    onChange={handleSelected}
                    defaultChecked={item.value === 'all'}
                  />
                  <label
                    htmlFor={`${item.idName}-${item.id}`}
                    className="text-sm font-medium text-white ml-2 block"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
            {inputSelected.length > 0 && inputSelected !== 'all' && (
              <div className="w-full flex items-center justify-center">
                {inputSelected === 'date' && (
                  <input
                    type="date"
                    value={inputValue}
                    onChange={handleChange}
                    className="w-[300px] rounded-md border border-[#e0e0e0] 
                    bg-white py-2 px-2 text-base font-medium text-[#6B7280]
                      outline-none focus:border-[#49aa26] focus:shadow-md"
                  />
                )}
                {inputSelected === 'cash-in' && (
                  <p className="text-base text-white border p-2 rounded font-semibold">
                    Todos os valores recebidos
                  </p>
                )}
                {inputSelected === 'cash-out' && (
                  <p className="text-base text-white border p-2 rounded font-semibold">
                    Todos os valores enviados
                  </p>
                )}
                <button
                  className="bg-white text-[#49aa26] rounded ml-1 w-auto 
                      py-2 px-2 text-lg flex items-center disabled:opacity-50"
                  disabled={inputValue.length > 0 ? false : true}
                  onClick={handleSubmit}
                >
                  Filtrar
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="block w-full overflow-x-auto">
          <table className="w-full text-[#969cbc] border-spacing-y-2 border-separate">
            <thead>
              <tr>
                <th className="py-4 px-8 text-left first-letter:first:rounded-l">
                  Histórico
                </th>
                <th className="py-4 px-8 text-left">Usuário</th>
                <th className="py-4 px-8 text-left">Valor</th>
                <th className="py-4 px-8 text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData?.map((item: any) => (
                <tr key={item.id} className="opacity-70 hover:opacity-100">
                  <td className="bg-white py-4 px-8 text-[#363f5f] first:rounded-l">
                    {item.type}
                  </td>
                  <td className="bg-white py-4 px-8 text-[#363f5f]">{item.transfer}</td>
                  <td
                    className={`bg-white ${
                      item.type === 'C' ? 'text-[#49aa26]' : 'text-[#e92929]'
                    } py-4 px-8`}
                  >
                    {Number(item.value).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="bg-white py-4 px-8 text-[#363f5f]">
                    {formatDate(item.createdAt)}
                  </td>
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
  const isValid = isTokenExpired(token);
  if (!token || isValid) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const res = await api.get('/transactions/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = res.data;
  const transactions = [...data['cash-in'], ...data['cash-out']];
  return { props: { transactions, data } };
}
