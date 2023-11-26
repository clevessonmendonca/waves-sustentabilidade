"use client";

import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangleIcon,
  BoxIcon,
  CalendarDays,
  CalendarIcon,
  CheckCircleIcon,
  Clock10Icon,
  InboxIcon,
  RecycleIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CollectionSchedule } from "@prisma/client";
import { getCollectionSchedules } from "@/app/actions/getCollectionSchedules";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  }, [schedules, userData]);

  if (!userData) {
    return <Loading />;
  }

  function formatDate(dateString: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

          {schedules ? (
            schedules?.length === 0 ? (
              <p className="text-sm opacity-75">Você ainda não tem pedidos!</p>
            ) : (
              <ul className="w-full">
                <ScrollArea className="max-h-48">
                  <div className="flex h-full max-h-48 flex-col gap-4">
                    {schedules.map((schedule) => (
                      <Card key={schedule.id} className="px-5 py-4">
                        <li className="flex flex-col gap-2">
                          <CardHeader className="flex flex-row justify-between p-0">
                            <h4 className="font-semibold">
                              {schedule.materialType}
                            </h4>

                            <div className="text-sm">
                              {schedule.status === "pending" ? (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <AlertTriangleIcon size={18} />
                                  <span>Pendente</span>
                                </div>
                              ) : schedule.status === "success" ? (
                                <div className="flex items-center gap-1 text-green-500">
                                  <CheckCircleIcon size={18} />
                                  <span>Sucesso</span>
                                </div>
                              ) : schedule.status === "in_process" ? (
                                <div className="flex items-center gap-1 text-blue-500">
                                  <InboxIcon size={18} />
                                  <span>Em Processo</span>
                                </div>
                              ) : null}
                            </div>
                          </CardHeader>
                          <CardContent className="grid grid-cols-2 gap-2 p-0 text-xs">
                            <div>
                              <span className="flex items-center gap-2 text-sm">
                                <CalendarDays size={18} />
                                Dia da Semana
                              </span>
                              <p>{schedule.dayOfWeek}</p>
                            </div>
                            <div>
                              <span className="flex items-center gap-2 text-sm">
                                <Clock10Icon size={18} />
                                Horário
                              </span>
                              <p>
                                Das {schedule.collectionStartTime} às{" "}
                                {schedule.collectionEndTime}
                              </p>
                            </div>
                            <div>
                              <span className="flex items-center gap-2 text-sm">
                                <BoxIcon size={18} />
                                Quantidade (kg)
                              </span>
                              <p>{schedule.quantityKg} Kg</p>
                            </div>

                            <div>
                              <span className="flex items-center gap-2 text-sm">
                                <CalendarIcon size={18} />
                                Data
                              </span>
                              {/* Use a função formatDate para formatar a data conforme necessário */}
                              <p>{formatDate(schedule.date)}</p>
                            </div>
                          </CardContent>
                        </li>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </ul>
            )
          ) : (
            <>
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
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
