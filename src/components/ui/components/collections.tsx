"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { RecycleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Collections = () => {
  return (
    <div>
      <div className="mb-6 mt-5 flex flex-col justify-center px-5">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-lg font-bold">Pedido de coleta</h1>
          <p className="max-w-sm text-center text-sm opacity-75">
            Tem material para descartar? Abra um novo pedido e solicite o
            serviço de um catador ou catadora!
          </p>
          <Link href="/collection">
            <Button className="mt-3 flex w-full items-center justify-center gap-3">
              <RecycleIcon size={16} /> Nova Coleta
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="collections" className="mt-5 flex flex-col px-5">
        <TabsList>
          <TabsTrigger value="collections" className="w-full">
            Coletas
          </TabsTrigger>
          <TabsTrigger value="history" className="w-full">
            Histórico
          </TabsTrigger>
        </TabsList>
        <TabsContent value="collections" className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <Badge
              variant="outline"
              className="flex w-full justify-center px-4 py-2"
            >
              <h3 className="text-base">Solicitadas</h3>
            </Badge>
            <p className="text-sm opacity-75">Você ainda não tem pedidos!</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Badge
              variant="outline"
              className="flex w-full justify-center px-4 py-2"
            >
              <h3 className="text-base">Agendadas</h3>
            </Badge>
            <p className="text-sm opacity-75">
              Não há nada agendado no momento.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="flex flex-col items-center gap-2">
            <Badge
              variant="outline"
              className="flex w-full justify-center px-4 py-2"
            >
              <h3 className="text-base">Histórico</h3>
            </Badge>
            <p className="text-sm opacity-75">Você ainda não tem pedidos!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
