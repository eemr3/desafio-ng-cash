import { RequestContext } from 'next/dist/server/base-server';
import { IoAddOutline, IoExitOutline, IoListCircleOutline } from 'react-icons/io5';
import { BsCash } from 'react-icons/bs';
import { GrTransaction } from 'react-icons/gr';
import Image from 'next/image';
import { api } from '../../server/http';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Modal } from '../../components/Modal';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Header';
import { TransactionProps } from '../../context/interfaces';
import { isTokenExpired } from '../../helpers/auth';
import { AxiosError } from 'axios';

export default function Dashboard({ data }: TransactionProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="w-full md:h-screen bg-[#f0f2f5]">
      <Modal closeModal={closeModal} isOpen={isOpen} refreshData={refreshData} />
      <Header data={data} />
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
        <section className="w-full flex md:h-[500px] flex-col md:flex-row items-center justify-center gap-2">
          <button
            onClick={openModal}
            className="w-[150px] h-[150px] border border-[#49aa26] 
            flex flex-col gap-1 items-center justify-center rounded"
          >
            <GrTransaction className="text-4xl" />
            Nova transação
          </button>
          <Link
            href="/transactions"
            className="w-[150px] h-[150px] border border-[#49aa26] 
            flex items-center justify-center rounded flex-col gap-1"
          >
            <BsCash className="text-4xl" />
            Histórico
          </Link>
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

  try {
    const res = await api.get('/transactions/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;
    const transactions = [...data['cash-in'], ...data['cash-out']];
    return { props: { transactions, data } };
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
  }
}
