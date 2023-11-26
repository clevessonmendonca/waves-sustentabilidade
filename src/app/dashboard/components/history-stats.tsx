"use client";

import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecycleIcon } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CollectionSchedule } from "@prisma/client";
import { getCollectionSchedules } from "@/app/actions/getCollectionSchedules";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const HistoryStats = () => {
  const userData = useContext(UserContext);
  const [schedules, setSchedules] = useState<CollectionSchedule[] | null>(null);

  useEffect(() => {
    const fetchCollectionSchedule = async () => {
      userData?.userData?.recycler.map(async (recycler) => {
        const schedule = await getCollectionSchedules(recycler.id);

        if (!schedule) return;
        setSchedules(schedule);
      });
    };

    if (schedules) return;

    fetchCollectionSchedule();
  }, [userData]);

  if (!userData) {
    return <Loading />;
  }
  return (
    <Tabs defaultValue="collections" className="mb-12 mt-5 flex flex-col px-5">
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
          <p className="text-sm opacity-75">Não há nada agendado no momento.</p>
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

          {schedules &&
            (schedules.length === 0 ? (
              <p className="text-sm opacity-75">Você ainda não tem pedidos!</p>
            ) : (
              <ul className="w-full">
                <ScrollArea className="max-h-40">
                  <div className="flex flex-col gap-4 h-full max-h-40">
                    
                  {schedules.map((schedule) => (
                    <Card key={schedule.id} className="px-5 py-4">
                      <li>
                        <h4 className="font-semibold">
                          {schedule.materialType}
                        </h4>
                        <div>
                          <span className="text-sm opacity-75">
                            Dia da Semana
                          </span>
                          <p>{schedule.dayOfWeek}</p>
                        </div>
                        - - {schedule.collectionStartTime} -{" "}
                        {schedule.collectionEndTime}
                      </li>
                    </Card>
                  ))}
                  </div>
                </ScrollArea>
              </ul>
            ))}

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
      </TabsContent>
    </Tabs>
  );
};
