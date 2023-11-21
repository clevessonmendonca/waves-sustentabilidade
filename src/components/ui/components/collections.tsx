"use client";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { RecycleIcon } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Collections = () => {
  const userData = useContext(UserContext);
  const [totalKgCollected, setTotalKgCollected] = useState<number | null>(null);
  const [collectionHistory, setCollectionHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData && userData.userData && userData.userData.id) {
          const personId = userData.userData.id;
  
          if (!personId) return;
  
          const collector = await prisma.collector.findFirst({
            where: { personId: personId },
          });
  
          const totalCollected = collector?.kgCollected || 0;
          setTotalKgCollected(totalCollected);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [userData]);
  

  if (!userData || !userData.userData) {
    return <Loading />;
  }

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

      <Separator />

      <Tabs
        defaultValue="collections"
        className="mb-12 mt-5 flex flex-col px-5"
      >
        <TabsList>
          <TabsTrigger value="collections" className="w-full">
            Coletas
          </TabsTrigger>
          <TabsTrigger value="history" className="w-full">
            Histórico
          </TabsTrigger>
        </TabsList>
        <TabsContent value="collections" className="flex flex-col gap-4">
          {totalKgCollected !== null ? (
            <div className="flex flex-col items-center gap-2">
              <Badge
                variant="outline"
                className="flex w-full justify-center px-4 py-2"
              >
                <h3 className="text-base">Solicitadas</h3>
              </Badge>
              {totalKgCollected > 0 ? (
                <>
                  <h4 className="text-sm opacity-75">Total de KG coletados:</h4>
                  <span className="font-bold"> {totalKgCollected} KG</span>
                </>
              ) : (
                <p className="text-sm opacity-75">
                  Você ainda não tem pedidos!
                </p>
              )}
            </div>
          ) : null}

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
          {collectionHistory.length > 0 ? (
            <div className="flex flex-col items-center gap-2">
              <Badge
                variant="outline"
                className="flex w-full justify-center px-4 py-2"
              >
                <h3 className="text-base">Histórico</h3>
              </Badge>
              <ul>
                {collectionHistory.map((collection) => (
                  <li key={collection.id}>
                    <p>Data: {collection.date}</p>
                    <p>Quantidade: {collection.quantity} KG</p>
                    {/* Adicione mais detalhes conforme necessário */}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Badge
                variant="outline"
                className="flex w-full justify-center px-4 py-2"
              >
                <h3 className="text-base">Histórico</h3>
              </Badge>
              <p className="text-sm opacity-75">Você ainda não tem pedidos!</p>

              <Link href="dashboard/collection">
                <Button
                  size="lg"
                  variant="link"
                  className="mt-3 flex w-full items-center justify-center gap-3"
                >
                  <RecycleIcon size={16} /> Faça um Pedido!
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
