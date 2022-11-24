import React from 'react';
import { TbError404 } from 'react-icons/tb';
export default function NotFound() {
  return (
    <div className="w-full h-screen flex-col flex justify-center items-center">
      <TbError404 className="text-9xl text-[#49aa26]" />
      <h1 className="text-[#49aa26] text-3xl">Ops! Página não encontrada</h1>
    </div>
  );
}
