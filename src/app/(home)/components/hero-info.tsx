"use client";

import { Button } from "@/components/ui/button";
import { handleLoginClick } from "@/components/ui/header";
import { ArrowRightIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const HeroInfo = () => {
  const { data: Session } = useSession();

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-2 px-5">
      <h1 className="max-w-md px-5 text-center text-3xl font-bold drop-shadow-md">
        Seja uma <span className="text-primary">Ponte</span> para salvar os
        Oceanos!
      </h1>
      <p className="max-w-sm text-center text-xs drop-shadow-lg">
        Unindo forças para limpar e proteger os tesouros subaquáticos do nosso
        planeta.
      </p>

      <div className="mt-5 flex gap-4">
        {Session?.user ? (
          <Link href="/dashboard">
            <Button className="shadow-lg">Ir para o painel</Button>
          </Link>
        ) : (
          <Link href="/signin">
            <Button className="shadow-lg">Salve o oceano</Button>
          </Link>
        )}
        <Link href="#about">
          <Button
            variant="outline"
            className="flex gap-2 border-none bg-transparent"
          >
            Saiba mais
            <ArrowRightIcon size={12} />
          </Button>
        </Link>
      </div>
    </div>
  );
};
