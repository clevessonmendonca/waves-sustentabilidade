"use client";

import { getCollectionSchedule } from "@/app/actions/getCollectionSchedule";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Card } from "@/components/ui/card";
import React, { useContext, useEffect, useState } from "react";
import { CollectionsSchedule } from "./Collections-schedule";
import { CalendarDaysIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CollectionSchedule } from "@prisma/client";
import { Collector } from "@/@types/User";
import { getCollectionSchedulesToCollectors } from "@/app/actions/getCollectionSchedulesToCollectors";
import { ProcessCollectionDialog } from "@/components/ui/process-collection-dialog";
import { ScheduleDialog } from "@/components/ui/schedules-dialog";

interface CollectionStateProps {
  collector: Collector | null;
}

export const CollectionState: React.FC<CollectionStateProps> = ({
  collector,
}) => {
  const userData = useContext(UserContext);
  const [schedules, setSchedules] = useState<CollectionSchedule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [acceptedSchedule, setAcceptedSchedules] = useState<
    CollectionSchedule[] | null
  >(null);

  useEffect(() => {
    const fetchCollectionScheduleAndCollector = async () => {
      if (!userData?.userData || !collector) return;

      const allSchedules = await getCollectionSchedulesToCollectors(
        userData.userData.id,
      );

      const schedule = await getCollectionSchedule(userData.userData.id);

      if (!allSchedules) return;

      const accepted = allSchedules.filter(
        (schedule) => schedule.collectorId === collector.id,
      );

      setAcceptedSchedules(accepted);
      setSchedules(schedule);
    };

    if (schedules) return;

    fetchCollectionScheduleAndCollector();
  }, [schedules, userData, collector]);

  if (!userData) {
    return <Loading />;
  }

  function handleProcessCollection() {
    setIsDialogOpen(true);
  }

  function handleScheduleCollection() {
    setIsDialogOpen(true);
  }

  return (
    <div>
      {!schedules ? (
        <Card className="flex flex-wrap justify-center rounded-full px-4 py-3 md:justify-between md:py-1">
          <div className="flex items-center gap-2">
            {collector ? (
              acceptedSchedule ? (
                <>
                  <span className="hidden rounded-full bg-accent p-4 md:inline-block">
                    <CalendarDaysIcon />
                  </span>
                  <h4 className="text-lg font-medium">Coleta em Andamento</h4>
                </>
              ) : (
                <>
                  <span className="hidden rounded-full bg-accent p-4 md:inline-block">
                    <CalendarDaysIcon />
                  </span>
                  <h4 className="text-lg font-medium">
                    Próximas Coletas Disponíveis
                  </h4>
                </>
              )
            ) : (
              <>
                <span className="hidden rounded-full bg-accent p-4 md:inline-block">
                  <CalendarDaysIcon />
                </span>
                <h4 className="text-lg font-medium">Agendar Nova Coleta</h4>
              </>
            )}
          </div>
          <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 md:w-auto md:flex-row md:justify-normal">
            {collector ? (
              acceptedSchedule && acceptedSchedule.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 text-center">
                    <InfoIcon className="text-yellow-500" />
                    <p className="text-sm opacity-75">
                      Você tem uma coleta em andamento!
                    </p>
                  </div>
                  <Button
                    className="rounded-full"
                    onClick={handleProcessCollection}
                  >
                    Ver Processo
                  </Button>

                  {isDialogOpen && (
                    <ProcessCollectionDialog
                      open={isDialogOpen}
                      onClose={() => setIsDialogOpen(false)}
                    />
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-center">
                    <InfoIcon className="text-yellow-500" />
                    <p className="text-sm opacity-75">
                      Confira as coletas próximas de você.
                    </p>
                  </div>
                  <Button
                    className="rounded-full"
                    onClick={handleScheduleCollection}
                  >
                    Ver Coletas
                  </Button>

                  {isDialogOpen && (
                    <ScheduleDialog
                      open={isDialogOpen}
                      onClose={() => setIsDialogOpen(false)}
                    />
                  )}
                </>
              )
            ) : (
              <>
                <div className="flex items-center gap-2 text-center">
                  <InfoIcon className="text-yellow-500" />
                  <p className="text-sm opacity-75">
                    Agende uma nova coleta agora mesmo.
                  </p>
                </div>
                <Link href="/dashboard/collection">
                  <Button className="rounded-full">Nova Coleta</Button>
                </Link>
              </>
            )}
          </div>
        </Card>
      ) : (
        <CollectionsSchedule schedule={schedules} />
      )}
    </div>
  );
};
