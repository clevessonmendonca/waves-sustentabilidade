"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getScheduleDetails } from "@/app/actions/getScheduleDetails";
import { useToast } from "@/components/ui/use-toast";
import {
  CollectionSchedule,
  Collector,
  Person,
  Recycler,
} from "@prisma/client";
import Link from "next/link";
import {
  AlertTriangleIcon,
  ArrowLeftCircle,
  ArrowLeftIcon,
  BadgeInfoIcon,
  BoxIcon,
  CalendarDays,
  CalendarIcon,
  CheckCircleIcon,
  Clock10Icon,
  InboxIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/components/ui/schedule-card";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage } from "@/components/ui/chat-message";

export interface PersonWithValues extends Person {
  avatar?: string | null;
  email: string;
}

type ScheduleDetails = {
  person: PersonWithValues;
  schedule: CollectionSchedule;
  recycler: Recycler;
};

export default function SchedulePage() {
  const { data: Session } = useSession();
  const router = useRouter();
  const { scheduleId } = useParams();
  const [collector, setCollector] = useState<Collector | null>(null);

  const [scheduleDetails, setScheduleDetails] =
    useState<ScheduleDetails | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const loadScheduleDetails = async () => {
      try {
        if (scheduleId) {
          const details = await getScheduleDetails(scheduleId as string);

          setScheduleDetails(details);
        }
      } catch (error) {
        console.error("Error loading schedule details:", error);
        toast({
          title: "Erro ao carregar os detalhes do agendamento.",
          description:
            "Ocorreu um error ao carregar os detalhes do agendamento, tente novamente mais tarde.",
          variant: "destructive",
        });
        router.push("/dashboard");
      }
    };

    loadScheduleDetails();
  }, [scheduleId]);

  if (!scheduleId) return;

  if (!scheduleDetails) return;
  return (
    <div className="relative max-h-screen mx-auto flex w-full max-w-screen-xl flex-col px-5">
      <Link href="/dashboard" className="flex items-center gap-3">
        <span className="rounded-full bg-accent p-2">
          <ArrowLeftIcon />
        </span>{" "}
        Voltar
      </Link>
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <div className="pb-4 pt-8">
            <h1 className="text-xl font-semibold">Informações da coleta</h1>
          </div>
          <Card className="max-w-lg px-5 py-4">
            <li className="flex flex-col gap-2">
              <CardHeader className="flex flex-row justify-between p-0">
                <h4 className="font-semibold">
                  {scheduleDetails?.schedule.materialType}
                </h4>
                <div className="text-sm">
                  {scheduleDetails?.schedule.status === "pending" ? (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <AlertTriangleIcon size={18} />
                      <span>Pendente</span>
                    </div>
                  ) : scheduleDetails?.schedule.status === "success" ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircleIcon size={18} />
                      <span>Sucesso</span>
                    </div>
                  ) : scheduleDetails?.schedule.status === "in_process" ? (
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
                  <p>{scheduleDetails?.schedule.dayOfWeek}</p>
                </div>
                <div>
                  <span className="flex items-center gap-2 text-sm">
                    <Clock10Icon size={18} />
                    Horário
                  </span>
                  <p>
                    Das {scheduleDetails?.schedule.collectionStartTime} às{" "}
                    {scheduleDetails?.schedule.collectionEndTime}
                  </p>
                </div>
                <div>
                  <span className="flex items-center gap-2 text-sm">
                    <BoxIcon size={18} />
                    Quantidade (kg)
                  </span>
                  <p>{scheduleDetails?.schedule.quantityKg} Kg</p>
                </div>
                <div>
                  <span className="flex items-center gap-2 text-sm">
                    <CalendarIcon size={18} />
                    Data
                  </span>
                  <p>{formatDate(scheduleDetails?.schedule.date!)}</p>
                </div>

                <div className="col-span-2 flex w-full flex-col gap-2 rounded-md bg-accent px-2 py-1">
                  <span className="flex items-center gap-2 text-sm">
                    <BadgeInfoIcon size={18} />
                    Descrição
                  </span>
                  <p>{scheduleDetails?.schedule.description}</p>
                </div>

                {scheduleDetails?.schedule.image && (
                  <div className="col-span-2">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        objectFit: "contain",
                      }}
                      className="h-full w-full max-w-[150px]"
                      src={scheduleDetails?.schedule.image}
                      alt={`Image by ${scheduleDetails?.schedule.materialType}`}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-0 text-xs opacity-70 ">
                <p className="w-full text-end">
                  ID: {scheduleDetails?.schedule.id}
                </p>
              </CardFooter>
            </li>
          </Card>
        </div>

        <div>
          <Card>
            <ChatMessage person={scheduleDetails.person} />
          </Card>
        </div>

        <div>
          <div className="pb-4 pt-8">
            <h2 className="text-xl font-semibold">Informações do reciclador</h2>
          </div>
          <Card className="flex max-w-lg flex-col items-center justify-center px-5 py-4">
            <CardHeader className="flex items-center">
              <Avatar className="h-20 w-20">
                <AvatarFallback>
                  {scheduleDetails?.person.name.toUpperCase()}
                </AvatarFallback>

                {scheduleDetails?.person.avatar && (
                  <AvatarImage src={scheduleDetails?.person.avatar} />
                )}
              </Avatar>

              <h3>{scheduleDetails.person.name}</h3>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
