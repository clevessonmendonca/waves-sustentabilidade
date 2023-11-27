"use client";

import { Collector } from "@/@types/User";
import { acceptSchedule } from "@/app/actions/accept-schedule";
import { getCollectionSchedulesToCollectors } from "@/app/actions/getCollectionSchedulesToCollectors";
import { getCollector } from "@/app/actions/getCollector";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CollectionSchedule } from "@prisma/client";
import {
  CalendarDays,
  Clock10Icon,
  BoxIcon,
  CalendarIcon,
  XIcon,
  CheckIcon,
  InfoIcon,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

export const ScheduleList = () => {
  const userData = useContext(UserContext);
  const { toast } = useToast();

  const [schedules, setSchedules] = useState<CollectionSchedule[] | null>(null);
  const [collector, setCollector] = useState<Collector | null>(null);

  useEffect(() => {
    const fetchCollectionScheduleAndCollector = async () => {
      if (!userData?.userData) return;

      const collector = await getCollector(userData.userData.id);

      if (!collector) return;

      const schedule = await getCollectionSchedulesToCollectors(
        userData.userData.id,
      );

      if (!schedule) return;

      setCollector(collector);
      setSchedules(schedule);
    };

    if (schedules) return;

    fetchCollectionScheduleAndCollector();
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

  const handleAccept = async (
    scheduleId: string,
    collectorId: string,
    schedule: CollectionSchedule,
  ) => {
    try {
      const result = await acceptSchedule(scheduleId, collectorId, schedule);

      if (result) {
        toast({
          title: "Agendamento Aceito!",
          description: `O agendamento foi aceito com sucesso.`,
        });
      } else {
        toast({
          title: "Uh oh! Parece que deu algo errado.",
          description: `Ocorreu um erro ao aceitar o agendamento. Tente novamente mais tarde.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Uh oh! Parece que deu algo errado.",
        description: `Ocorreu um erro ao aceitar o agendamento. Tente novamente mais tarde.`,
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      {schedules ? (
        schedules?.length === 0 ? (
          <>
            <Separator />
            <p className="mt-8 text-center text-sm opacity-75">
              Não possui nenhum agendamento no momento!
            </p>
          </>
        ) : (
          <ul className="w-full">
            {!schedules.some((schedule) => schedule.status === "pending") ? (
              <p className="my-4 text-center text-sm opacity-75">
                Não há nada solicitado no momento.
              </p>
            ) : (
              <ScrollArea className="max-h-64">
                <div className="flex h-full max-h-64 flex-col gap-4">
                  {schedules.map((schedule) => (
                    <div className="py-1" key={schedule.id}>
                      {schedule.status === "pending" && (
                        <Card className="px-5 py-4">
                          <li className="flex flex-col gap-1">
                            <CardHeader className="flex flex-row items-center justify-between p-0">
                              <h4 className="font-semibold">
                                {schedule.materialType}
                              </h4>

                              <Button variant="link" className="p-0">
                                <InfoIcon size={22} />
                              </Button>
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
                                <p>{formatDate(schedule.date)}</p>
                              </div>
                            </CardContent>

                            <CardFooter className="flex justify-end gap-4 px-0 py-1">
                              <Button variant="outline" className="flex gap-2">
                                <XIcon /> Rejeitar
                              </Button>
                              <Button
                                className="flex gap-2"
                                onClick={() =>
                                  handleAccept(
                                    schedule.id,
                                    collector!.id,
                                    schedule,
                                  )
                                }
                              >
                                <CheckIcon /> Aceitar
                              </Button>
                            </CardFooter>
                          </li>
                        </Card>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </ul>
        )
      ) : (
        <>
          <Separator />
          <p className="mt-8 text-center text-sm opacity-75">
            Não possui nenhum agendamento no momento!
          </p>
        </>
      )}
    </div>
  );
};
