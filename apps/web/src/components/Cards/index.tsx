import Image from 'next/image';
import React from 'react';

interface IUser {
  id: number;
  username: string;
}

interface ICash {
  id: number;
  value: string;
  transfer: string;
  createdAt: string;
  type: string;
}

interface DataTransfer {
  id: number;
  balance: number;
  user: IUser;
  'cash-in': ICash[];
  'cash-out': ICash[];
}

interface CardsProps {
  data?: DataTransfer;
}

export default function Cards({ data }: CardsProps) {
  return (
    <section className="mt-[-7rem]">
      <div className="bg-[#49aa26] py-6 px-8 mb-8 text-white rounded-[0.25rem]">
        <h3 className="text-base font-normal flex justify-between items-center">
          <span>Balanço</span>
          <Image src="/total.svg" alt="Imagem de total" width={32} height={32} />
        </h3>
        <p className="text-[2rem]">
          {data?.balance.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
    </section>
  );
}
