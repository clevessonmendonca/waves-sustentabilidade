import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CollectionSchedule } from "@prisma/client";
import { AlertTriangleIcon, CalendarClockIcon } from "lucide-react";
import React from "react";

export const CollectionsSchedule = ({ schedule }: { schedule: CollectionSchedule }) => {
  return (
    <Card className="flex flex-wrap justify-between rounded-full px-4 py-1">
      <div className="flex items-center gap-4">
        <span className="inline-block rounded-full bg-accent p-4">
          <CalendarClockIcon />
        </span>
        <h4 className="text-lg font-medium">Agendamentos</h4>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangleIcon className="text-yellow-500" />
          <p className="text-sm opacity-75">
            Você tem 1 agendamento em processo
          </p>
        </div>
        <Button className="rounded-full">Conferir</Button>
      </div>
    </Card>
  );
};
