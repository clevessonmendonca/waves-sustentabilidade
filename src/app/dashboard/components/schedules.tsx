import { Badge } from "@/components/ui/badge";
import React from "react";
import { ScheduleList } from "./schedules-list";

export const Schedules = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Badge
          variant="secondary"
          className="flex w-full justify-center  px-4 py-2 text-base"
        >
          Coletas
        </Badge>
        <p className="text-xs text-center opacity-75">
          Confira as coletas próximas de você. <br /> Caso tenha interesse em alguma
          clique em Aceitar.
        </p>
      </div>
      <div>
        <ScheduleList />
      </div>
    </div>
  );
};
