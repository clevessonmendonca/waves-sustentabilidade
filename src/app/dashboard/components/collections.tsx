"use client";
import { Button } from "@/components/ui/button";
import { RecycleIcon } from "lucide-react";
import Link from "next/link";

export const Collections = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="mb-6 mt-5 flex flex-col justify-center px-5">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-lg font-bold">Pedido de coleta</h1>
          <p className="max-w-sm text-center text-sm opacity-75">
            Tem material para descartar? Abra um novo pedido e solicite o
            serviço de um catador ou catadora!
          </p>
          <Link href="/dashboard/collection">
            <Button
              size="lg"
              className="mt-3 flex w-full items-center justify-center gap-3"
            >
              <RecycleIcon size={16} /> Nova Coleta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
