import { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '../../context/AuthProvider';
import { IoArrowBackCircleOutline, IoExitOutline } from 'react-icons/io5';
import Link from 'next/link';

export default function Header({ data, locale }: any) {
  const { signOut } = useContext(AuthContext);

  return (
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
        <span className="text-[#49aa26] font-semibold">{data.user.username}</span> :)
      </h2>
      {locale === 'transactions' ? (
        <Link
          href="/dashboard"
          className="absolute flex items-center top-8 left-10 md:right-24 text-white"
        >
          <IoArrowBackCircleOutline className="mr-1 text-[1.4rem]" />
          Voltar
        </Link>
      ) : null}
      <button
        onClick={signOut}
        className="absolute flex items-center top-8 right-4 md:right-24 text-white"
      >
        <IoExitOutline className="mr-1 text-[1.4rem]" />
        Sair
      </button>
    </header>
  );
}
