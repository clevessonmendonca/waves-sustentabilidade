import { CollectionSchedule } from "@prisma/client";
import {
  InboxIcon,
  CalendarDays,
  Clock10Icon,
  BoxIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from "lucide-react";
import React from "react";
import { Card, CardHeader, CardContent } from "./card";
import Link from "next/link";

interface ScheduleCardProps {
  schedule: CollectionSchedule;
}

export function formatDate(dateString: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  return (
    <Link href={`dashboard/schedule/${schedule.id}`}>
      <Card className="px-5 py-4">
        <li className="flex flex-col gap-2">
          <CardHeader className="flex flex-row justify-between p-0">
            <h4 className="font-semibold">{schedule.materialType}</h4>
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
              <p>{formatDate(schedule.date)}</p>
            </div>
          </CardContent>
        </li>
      </Card>
    </Link>
  );
};
