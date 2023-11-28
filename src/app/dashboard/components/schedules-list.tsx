"use client";

import { Collector } from "@/@types/User";
import { acceptSchedule } from "@/app/actions/accept-schedule";
import { getCollectionSchedulesToCollectors } from "@/app/actions/getCollectionSchedulesToCollectors";
import { getCollector } from "@/app/actions/getCollector";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScheduleCard } from "@/components/ui/schedule-card";
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
  AlertOctagon,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

export const ScheduleList = () => {
  const userData = useContext(UserContext);
  const { toast } = useToast();

  const [schedules, setSchedules] = useState<CollectionSchedule[] | null>(null);
  const [acceptedSchedule, setAcceptedSchedules] = useState<
    CollectionSchedule[] | null
  >(null);
  const [collector, setCollector] = useState<Collector | null>(null);

  useEffect(() => {
    const fetchCollectionScheduleAndCollector = async () => {
      if (!userData?.userData) return;

      const collector = await getCollector(userData.userData.id);

      if (!collector) return;

      const allSchedules = await getCollectionSchedulesToCollectors(
        userData.userData.id,
      );

      if (!allSchedules) return;

      const accepted = allSchedules.filter(
        (schedule) => schedule.collectorId === collector.id,
      );
      setAcceptedSchedules(accepted);

      const pending = allSchedules.filter(
        (schedule) => schedule.status === "pending",
      );

      setCollector(collector);
      setSchedules(pending);
    };

    if (schedules) return;

    fetchCollectionScheduleAndCollector();
  }, [schedules, userData, acceptedSchedule]);

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

        return setAcceptedSchedules((prevAcceptedSchedules) => [
          ...(prevAcceptedSchedules ?? []),
          result,
        ]);
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

  const handleReject = async (scheduleId: string) => {
    try {
      setSchedules((prevSchedules) =>
        (prevSchedules ?? []).filter((schedule) => schedule.id !== scheduleId),
      );

      toast({
        title: "Agendamento Rejeitado",
        description: "O agendamento foi rejeitado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Uh oh! Parece que deu algo errado.",
        description:
          "Ocorreu um erro ao rejeitar o agendamento. Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(`Erro ao rejeitar agendamento ${scheduleId}:`, error);
    }
  };

  return (
    <div>
      {schedules ? (
        acceptedSchedule && acceptedSchedule.length > 0 ? (
          <ScrollArea className="max-h-64">
            <div className="flex h-full max-h-64 flex-col gap-4">
              <Separator />
              <h3 className=" flex items-center justify-center gap-2 font-semibold">
                <AlertOctagon /> Você possui coletas em processo
              </h3>
              {acceptedSchedule.map((schedule) => (
                <div className="py-1" key={schedule.id}>
                  <ScheduleCard schedule={schedule} />
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : schedules?.length === 0 ? (
          <>
            <Separator />
            <p className="mt-8 text-center text-sm opacity-75">
              Não possui nenhum agendamento no momento!
            </p>
          </>
        ) : (
          <ul className="w-full">
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
                            <Button
                              variant="outline"
                              className="flex gap-2"
                              onClick={() => handleReject(schedule.id)}
                            >
                              <XIcon size={22} /> Rejeitar
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
                              <CheckIcon size={22} /> Aceitar
                            </Button>
                          </CardFooter>
                        </li>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
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
